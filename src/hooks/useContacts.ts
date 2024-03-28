import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { type Contact } from 'expo-contacts';
import { type IContact } from './@types';

export const useContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (contact) =>
                  contact.firstName &&
                  contact.emails &&
                  contact.emails[0] &&
                  contact.emails[0].email
              )
              .map(mapContacts)
          );
        }
      }
    })();
  }, []);

  const mapContacts = (contact: Contact) => {
    return {
      id: contact.id,
      contactName:
        contact.firstName && contact.lastName
          ? `${contact.firstName} ${contact.lastName}`
          : contact.firstName,
      email: contact.emails[0].email,
    };
  };

  return contacts;
};
