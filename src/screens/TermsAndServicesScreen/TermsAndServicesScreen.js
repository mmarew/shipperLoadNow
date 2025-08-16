import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import styles from './TermsAndServicesScreen.style';
import createStyles from './TermsAndServicesScreen.style';
const TermsAndServicesScreen = ({ navigation }) => {
  const styles = createStyles();
  const handleAgree = () => {
    // Alert.alert('Agreement', 'You have agreed to the Terms and Services.');
    navigation.goBack(); // Navigate back or proceed as needed
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By using the [App Name] platform ("the App"), you agree to abide by
            these Terms and Services. These terms govern your access to and use
            of the App, its services, and any content or functionality provided.
            If you do not agree to these terms, you may not use the App.
          </Text>

          <Text style={styles.subHeading}>2. Passenger Responsibilities</Text>
          <Text style={styles.text}>
            As a passenger, you agree to:
            {'\n'}- Provide accurate personal information, including your name,
            phone number, and payment details.
            {'\n'}- Use the App responsibly and not for any unlawful or
            unauthorized purpose.
            {'\n'}- Ensure timely availability at pickup and drop-off points.
            {'\n'}- Comply with local laws and regulations related to
            transportation services.
            {'\n'}- Treat drivers and their property with respect.
          </Text>

          <Text style={styles.subHeading}>3. Prohibited Activities</Text>
          <Text style={styles.text}>
            Passengers are prohibited from:
            {'\n'}- Using the App to engage in any illegal activities.
            {'\n'}- Providing false or misleading information.
            {'\n'}- Harassing, threatening, or abusing drivers or other users.
            {'\n'}- Damaging vehicles or property belonging to drivers.
            {'\n'}- Using the App while under the influence of drugs or alcohol.
          </Text>

          <Text style={styles.subHeading}>4. Booking and Cancellation</Text>
          <Text style={styles.text}>
            {'\u2022'} Passengers are responsible for providing accurate pickup
            and drop-off details when booking a shipment delivery or ride.
            {'\n'}
            {'\u2022'} Passengers may cancel a booking through the App.
            Cancellation fees may apply based on the time of cancellation.
          </Text>

          <Text style={styles.subHeading}>5. Payment and Fees</Text>
          <Text style={styles.text}>
            {'\u2022'} Passengers agree to pay all applicable charges, including
            base fares, service fees, and additional costs (e.g., wait time,
            tolls).
            {'\n'}
            {'\u2022'} Payment methods include credit/debit cards and digital
            wallets.
            {'\n'}
            {'\u2022'} The final cost will be displayed in the App before
            confirming the booking.
          </Text>

          <Text style={styles.subHeading}>6. Safety and Conduct</Text>
          <Text style={styles.text}>
            Passengers must adhere to safety instructions provided by the
            driver. The App is not liable for any personal injuries or property
            damage caused by passengers’ actions. The App reserves the right to
            terminate accounts for repeated violations of these Terms.
          </Text>

          <Text style={styles.subHeading}>7. Limitation of Liability</Text>
          <Text style={styles.text}>
            The App acts as a facilitator between passengers and drivers. It is
            not responsible for the actions of the driver or the condition of
            the vehicle. Passengers agree to release the App from any liability
            arising from delays, cancellations, or disputes with drivers.
          </Text>

          <Text style={styles.subHeading}>8. Privacy and Data Use</Text>
          <Text style={styles.text}>
            The App collects and processes passenger information to provide
            services. Passengers agree to share location data during active
            rides or shipments for service optimization.
          </Text>

          <Text style={styles.subHeading}>9. Dispute Resolution</Text>
          <Text style={styles.text}>
            For disputes related to bookings, payments, or services, passengers
            may contact customer support via the App. The App will investigate
            complaints and mediate resolutions between passengers and drivers.
          </Text>

          <Text style={styles.subHeading}>10. Modifications to Terms</Text>
          <Text style={styles.text}>
            The App reserves the right to update these Terms and Services at any
            time. Passengers will be notified of significant changes. Continued
            use of the App after modifications constitutes acceptance of the
            revised terms.
          </Text>

          <Text style={styles.subHeading}>11. Contact Information</Text>
          <Text style={styles.text}>
            For questions or support, passengers can reach out to us at:
            {'\n'}- Email: support@[appname].com
            {'\n'}- Phone: +[Support Number]
            {'\n'}- Address: [Company Address]
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
        <Text style={styles.agreeButtonText}>Agree and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsAndServicesScreen;
