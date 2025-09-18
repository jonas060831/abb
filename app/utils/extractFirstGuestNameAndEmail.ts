const extractFirstGuestAndEmail = (guestArray: any) => {
    return guestArray.map((guest: any) => {
        const fullName = guest.guestNames[0] || '';
        let firstName = fullName.trim().split(' ')[0];
        // Capitalize first letter, lowercase the rest
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

        return {
            firstName,
            email: guest.contactEmail.toLowerCase()
        };
    });
};


export default extractFirstGuestAndEmail