'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './RsvpForm.module.css';
import TextInput from '../inputs/TextInput/TextInput';

import { GrPrevious, GrNext } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { addNewRsvp } from '@/app/(serverFunctions)/rsvp';
import OkModal from '@/ui/Modals/OkModal';


const steps = [
  { id: 1, content: "Step 1: Guest'(s) Information" },
  { id: 2, content: 'Step 2: Contact Details' },
  { id: 3, content: 'Step 3: Attendance' },
  { id: 4, content: 'Step 4: Confirm' },
];

const attendanceOptions = ['Baptism Only', 'Reception Only', 'Baptism & Reception'];

const RsvpForm = () => {
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState({
    guestNames: [''],
    contactEmail: '',
    contactNumber: '',
    attendance: 'Baptism & Reception'
  });

  const [showModal, setShowModal] = useState(false);
  const [confirmationId, setConfirmationId] = useState('')
  
  const paginate = (newDirection: number) => {
    if ((newDirection === 1 && page >= steps.length - 1) || (newDirection === -1 && page <= 0)) {
      return;
    }

    setDirection(newDirection);
    setPage(prev => prev + newDirection);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prev => ({ ...prev, [name]: value }));
  }

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

  const handleSubmit = async (event: FormEvent) => {
    
    event.preventDefault()

    const cleanedGuestNames = formData.guestNames.filter(name => name.trim() !== '');

    const cleanedData = {
      ...formData,
      guestNames: cleanedGuestNames
    };


    try {
      
     const res = await addNewRsvp(cleanedData)
     
     const { success, data } = res

     if(success) {

      setShowModal(true)

      setConfirmationId(data!.rsvpId!)
     }

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className={styles.formWrapper}>
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
                    {formData.guestNames.map((names, index) => (
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
          <button className={styles.form_button} onClick={() => paginate(-1)}> <GrPrevious /> </button>
        )}
        {step < steps.length - 1 ? (
          <button className={styles.form_button} onClick={() => paginate(1)}> <GrNext /> </button>
        ) : (
          <button className={styles.form_button} onClick={handleSubmit}>Submit</button>
        )}
      </div>


      {/* Response from server */}
      <OkModal
        show={showModal}
        title="Thank You!"
        redirectUrl='/'
        message={<div style={{textAlign: 'left'}}>
          Woohoo! 🎉 You're in! <br /><br />
          Thanks for RSVPing. We can't wait to celebrate with you. <br /><br />
          Get ready for fun, hugs, and maybe a dance move or two!
          
          <br /><br /><br /><br />
          <p>Confirmation Number: <span className={styles.confirmationId}> {confirmationId} </span></p>
          <br /><br /><br /><br />
        </div>}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
};

export default RsvpForm;
