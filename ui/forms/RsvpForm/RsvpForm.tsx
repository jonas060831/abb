'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './RsvpForm.module.css';
import TextInput from '../inputs/TextInput/TextInput';

import { GrPrevious, GrNext } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { addNewRsvp, updateRsvp, sendRSVPConfirmationEmailToGuest, sendRSVPConfirmationEmailToEventOwner } from '@/app/(serverFunctions)/rsvp';
import OkModal from '@/ui/Modals/OkModal';
import { renderToStaticMarkup } from 'react-dom/server';
import RsvpConfirmationEmail from '@/emails/RsvpConfirmationEmail';
import RsvpOwnerNotificationEmail from '@/emails/RsvpNoticeToEventOwner';

const steps = [
  { id: 1, content: "Step 1: Guest'(s) Information" },
  { id: 2, content: 'Step 2: Contact Details' },
  { id: 3, content: 'Step 3: Attendance' },
  { id: 4, content: 'Step 4: Confirm' },
];

const attendanceOptions = ['Baptism Only', 'Reception Only', 'Baptism & Reception'];

// Define the shape of RSVP data
interface RsvpData {
  _id?: string;
  rsvpId?: string;
  guestNames: string[];
  contactEmail: string;
  contactNumber: string;
  attendance: string;
  createdAt?: string;
  updatedAt?: string;
}

type RsvpFormProps = {
  initialData?: RsvpData;
  mode?: 'create' | 'update';
}

const RsvpForm: FC<RsvpFormProps> = ({ initialData, mode = 'create' }) => {
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState({
    guestNames: [''],
    contactEmail: '',
    contactNumber: '',
    attendance: 'Baptism & Reception',
    rsvpId: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        guestNames: initialData.guestNames.length > 0 ? initialData.guestNames : [''],
        contactEmail: initialData.contactEmail || '',
        contactNumber: initialData.contactNumber || '',
        attendance: initialData.attendance || 'Baptism & Reception',
        rsvpId: initialData._id || initialData._id || ''
      });
    }
  }, [initialData]);

  const paginate = (newDirection: number) => {
    if ((newDirection === 1 && page >= steps.length - 1) || (newDirection === -1 && page <= 0)) {
      return;
    }

    setDirection(newDirection);
    setPage(prev => prev + newDirection);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestNameChange = (index: number, value: string) => {
    setFormData(prev => {
      const updatedGuests = [...prev.guestNames];
      updatedGuests[index] = value;
      return { ...prev, guestNames: updatedGuests };
    });
  };

  const addGuestNameField = () => {
    setFormData(prev => ({
      ...prev,
      guestNames: [...prev.guestNames, '']
    }));
  };

  const removeGuestNameField = (index: number) => {
    setFormData(prev => {
      const updatedGuests = [...prev.guestNames];
      updatedGuests.splice(index, 1);
      return { ...prev, guestNames: updatedGuests };
    });
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 0:
        return formData.guestNames.some(name => name.trim() !== '' && name.length >= 3);
      case 1:
        return (
          /\S+@\S+\.\S+/.test(formData.contactEmail) &&
          formData.contactNumber.trim().length >= 10
        );
      case 2:
        return attendanceOptions.includes(formData.attendance);
      default:
        return true;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const cleanedGuestNames = formData.guestNames.filter(name => name.trim() !== '');
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.contactEmail);
    const isValidPhone = formData.contactNumber.trim().length >= 7;

    if (cleanedGuestNames.length === 0 || !isValidEmail || !isValidPhone) {
      alert("Please make sure all required fields are filled out properly:\n\n- Guest name(s)\n- Valid email\n- Valid phone number");
      setIsLoading(false);
      return;
    }

    const cleanedData = {
      ...formData,
      guestNames: cleanedGuestNames
    };

    try {
      let res;
      
      if (mode === 'update' && formData.rsvpId) {
        // Update existing RSVP
        res = await updateRsvp(formData.rsvpId, cleanedData);
      } else {
        // Create new RSVP
        res = await addNewRsvp(cleanedData);
      }

      const { success, data } = res;

      if (success && data) {

        console.log(success)
        console.log(data)

        setShowModal(true);
        setConfirmationId(data.rsvpId || data._id);

        // Only send emails for new RSVPs, not updates
        if (mode === 'create') {
          const stringDate: string = new Date(data.createdAt!).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          });

          const rsvpConfirmationEmailToGuest = renderToStaticMarkup(
            <RsvpConfirmationEmail
              guestName={cleanedGuestNames[0]}
              confirmationNumber={data.rsvpId || data._id}
              editUrl={`${process.env.BASE_URL}/rsvp/update/${data._id}`}
            />
          );

          const rsvpConfirmationEmailToEventOwner = renderToStaticMarkup(
            <RsvpOwnerNotificationEmail
              eventOwnerName='Master and ms. Kristine'
              dashboardUrl={`${process.env.BASE_URL}/dashboard`}
              guestName={data.guestNames[0]}
              guestEmail={data.contactEmail}
              guestCount={data.guestNames.length}
              rsvpTime={stringDate}
            />
          );

          await sendRSVPConfirmationEmailToGuest(formData.contactEmail, rsvpConfirmationEmailToGuest);
          await sendRSVPConfirmationEmailToEventOwner(rsvpConfirmationEmailToEventOwner);
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error submitting your RSVP. Please try again.');
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    return mode === 'update' ? 'RSVP Updated!' : 'Thank You!';
  };

  const getModalMessage = () => {
    if (mode === 'update') {
      return (
        <div style={{ textAlign: 'left' }}>
          Your RSVP has been successfully updated! 🎉 <br /><br />
          We've got all your latest details. Thanks for keeping us in the loop!
          <br /><br /><br /><br />
          <p>Confirmation Number: <span className={styles.confirmationId}> {confirmationId} </span></p>
          <br /><br /><br /><br />
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'left' }}>
        Woohoo! 🎉 You're in! <br /><br />
        Thanks for RSVPing. We can't wait to celebrate with you. <br /><br />
        Get ready for fun, hugs, and maybe a dance move or two!
        <br /><br /><br /><br />
        <p>Confirmation Number: <span className={styles.confirmationId}> {confirmationId} </span></p>
        <br /><br /><br /><br />
      </div>
    );
  };

  const getSubmitButtonText = () => {
    if (isLoading) {
      return <img src="/medias/svgs/loading-spinner.svg" alt='Loading...' style={{ width: '20px' }} />;
    }
    return mode === 'update' ? 'Update RSVP' : 'Submit';
  };

  return (
    <div className={styles.formWrapper}>
      {mode === 'update' && (
        <div className={styles.updateNotice}>
          <h3>Update Your RSVP</h3>
          <p>Make changes to your existing RSVP below.</p>
        </div>
      )}

      <AnimatePresence
        custom={direction}
        initial={false}
        mode="wait"
        onExitComplete={() => setStep(page)}
      >
        <motion.div
          key={`${page}-${direction}`}
          custom={direction}
          variants={{
            initial: (dir: number) => ({
              x: dir === 1 ? 300 : -300,
              opacity: 0,
            }),
            animate: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.4 },
            },
            exit: (dir: number) => ({
              x: dir === 1 ? -300 : 300,
              opacity: 0,
              transition: { duration: 0.4 },
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.formStep}
        >
          <h2 className={styles.form_page_title}>{steps[step].content}</h2>
          {step === 0 && (
            <div className={styles.form_page}>
              {formData.guestNames.map((name, index) => (
                <div key={index} className={styles.guestField}>
                  <TextInput
                    label={`Guest ${index + 1} Name`}
                    name={`guest-${index}`}
                    value={name}
                    required={true}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                  />
                  {formData.guestNames.length > 1 && (
                    <button
                      type="button"
                      className={styles.deleteGuestButton}
                      onClick={() => removeGuestNameField(index)}
                      aria-label={`Delete Guest ${index + 1}`}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addGuestNameField}
                className={styles.addGuestButton}
              >
                <IoIosAdd />
              </button>
            </div>
          )}
          {step === 1 && (
            <div className={styles.form_page}>
              <TextInput
                name='contactEmail'
                type='email'
                label='Email Address'
                value={formData.contactEmail}
                onChange={handleChange}
              />
              <TextInput
                name='contactNumber'
                type='text'
                label='Phone #'
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
          )}
          {step === 2 && (
            <div className={styles.radioGroup}>
              <div className={styles.radioOptions}>
                {attendanceOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="attendance"
                      value={option}
                      checked={formData.attendance === option}
                      onChange={handleChange}
                    />
                    &nbsp;&nbsp; {option}
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <strong style={{ color: 'gray' }}>Attendee{formData.guestNames.length > 1 ? 's' : ''} </strong>
              <ul>
                {formData.guestNames.filter(name => name.trim() !== '').map((names, index) => (
                  <li key={index}>{names}</li>
                ))}
              </ul>
              <br />
              <hr />
              <strong style={{ color: 'gray' }}>Contact Details</strong> <br /><br />
              <strong>Email:</strong> {formData.contactEmail} <br /><br />
              <strong>Phone #:</strong> {formData.contactNumber}
              <br /><br />
              <hr />
              <p><strong style={{ color: 'gray' }}>Attendance:</strong> {formData.attendance}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.buttonGroup}>
        {step > 0 && (
          <button className={styles.form_button} onClick={() => paginate(-1)}> 
            <GrPrevious /> 
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            className={styles.form_button}
            onClick={() => paginate(1)}
            disabled={!canProceedToNextStep()}
            style={{
              opacity: canProceedToNextStep() ? 1 : 0.5,
              cursor: canProceedToNextStep() ? 'pointer' : 'not-allowed'
            }}
          >
            <GrNext />
          </button>
        ) : (
          <button className={styles.form_button} onClick={handleSubmit} disabled={isLoading}>
            {getSubmitButtonText()}
          </button>
        )}
      </div>

      <OkModal
        show={showModal}
        title={getModalTitle()}
        redirectUrl='/'
        message={getModalMessage()}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default RsvpForm;