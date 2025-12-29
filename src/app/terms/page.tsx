import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      {/* 1. Introduction */}
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-2">1.1. Welcome to <strong>GroupWish</strong> (“the Website”), operated by GroupWish Pvt. Ltd (“GroupWish”).</p>
      <p className="mb-2">1.2. By accessing or using this Website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use the Website.</p>
      <p className="mb-4">1.3. These Terms may be updated from time to time, and your continued use of the Website constitutes acceptance of the updated Terms.</p>

      {/* 2. Eligible Users */}
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Eligible Users</h2>
      <p className="mb-2">2.1. The Website is intended for:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Organisers: Individuals creating a gift collection account.</li>
        <li>Contributors: Individuals contributing to a gift collection.</li>
      </ul>
      <p className="mb-2">2.2. Organisers and Contributors may access different sections of the Website based on their role.</p>
      <p className="mb-2">2.3. You must create a unique login or other access credentials. These credentials are personal and must not be shared.</p>
      <p className="mb-2">2.4. You are responsible for all activity conducted through your account. GroupWish is not liable for unauthorized access if login information is disclosed.</p>
      <p className="mb-4">2.5. GroupWish may suspend or terminate accounts or limit access at its discretion.</p>

      {/* 3. User Content */}
      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Content</h2>
      <p className="mb-2">3.1. By posting or submitting content to the Website, you agree to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Not submit content that is offensive, illegal, abusive, defamatory, or inappropriate;</li>
        <li>Not impersonate any other person;</li>
        <li>Allow Organisers to view and share content as needed;</li>
        <li>Permit GroupWish to remove any content that violates these Terms.</li>
      </ul>

      {/* 4. Organiser Responsibilities */}
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Organiser Responsibilities</h2>
      <p className="mb-2">4.1. Organisers must be at least 18 years old or have parental/guardian consent.</p>
      <p className="mb-2">4.2. Organisers must maintain a valid bank account for receiving funds collected through the Registry Account.</p>
      <p className="mb-2">4.3. Withdrawals may take up to four business days. GroupWish is not liable for delays outside its control.</p>
      <p className="mb-2">4.4. Inactive accounts (over 12 months) will be handled according to standard unclaimed funds procedures.</p>
      <p className="mb-4">4.5. Organisers guarantee lawful use of the Website and indemnify GroupWish against any claims arising from misuse.</p>

      {/* 5. Contributions */}
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contributions</h2>
      <p className="mb-2">5.1. Contributors must provide valid payment information to make contributions.</p>
      <p className="mb-2">5.2. A service fee applies to each contribution. The fee may be added to or deducted from the contribution based on the Organiser’s preference.</p>
      <p className="mb-2">5.3. Refunds are available if the Organiser cancels a collection before its scheduled end date, minus any service fees.</p>
      <p className="mb-2">5.4. GroupWish does not guarantee how contributions will be used by Organisers.</p>
      <p className="mb-4">5.5. Contributors assume all risk regarding the use of funds. GroupWish is not responsible for misuse, fraud, or theft.</p>

      {/* 6. Website Security */}
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Website Security</h2>
      <p className="mb-4">6.1. The Website uses standard encryption to protect financial transactions. Credit card information is not stored after processing.</p>

      {/* 7. Intellectual Property */}
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Intellectual Property</h2>
      <p className="mb-2">7.1. All content, logos, software, and materials on the Website are protected by copyright, trademark, and other intellectual property laws.</p>
      <p className="mb-2">7.2. You may not reproduce, distribute, modify, or create derivative works without written permission from GroupWish.</p>
      <p className="mb-4">7.3. Reverse engineering, decompiling, or using software to extract data from the Website is strictly prohibited.</p>

      {/* 8. Disclaimer */}
      <h2 className="text-xl font-semibold mt-6 mb-2">8. Disclaimer</h2>
      <p className="mb-2">8.1. Content on the Website is for general information only and may not be up-to-date.</p>
      <p className="mb-2">8.2. The Website is provided “as is,” and GroupWish makes no guarantee of uninterrupted access or error-free operation.</p>
      <p className="mb-2">8.3. GroupWish disclaims all warranties regarding the accuracy, reliability, or suitability of the Website content.</p>
      <p className="mb-4">8.4. GroupWish does not guarantee that the Website is free from viruses or technical issues.</p>

      {/* 9. Limitation of Liability */}
      <h2 className="text-xl font-semibold mt-6 mb-2">9. Limitation of Liability</h2>
      <p className="mb-2">9.1. GroupWish is not liable for indirect, incidental, or consequential losses, including loss of profits.</p>
      <p className="mb-2">9.2. This applies to losses arising from the use of the Website or contributions.</p>
      <p className="mb-4">9.3. GroupWish is not liable for errors, delays, interruptions, or offensive or illegal content.</p>

      {/* 10. Termination */}
      <h2 className="text-xl font-semibold mt-6 mb-2">10. Termination</h2>
      <p className="mb-2">10.1. GroupWish may suspend or terminate access at any time without notice.</p>
      <p className="mb-2">10.2. Upon termination, any funds in credit will be returned to the Organiser according to standard procedures.</p>
      <p className="mb-4">10.3. Limitation of liability and indemnity provisions remain in effect after termination.</p>

      {/* 11. General Terms */}
      <h2 className="text-xl font-semibold mt-6 mb-2">11. General Terms</h2>
      <p className="mb-2">11.1. If any provision is found invalid, the remainder remains effective.</p>
      <p className="mb-2">11.2. Delay or failure to exercise a right does not waive that right.</p>
      <p className="mb-4">11.3. Waivers must be in writing. Partial exercise of a right does not prevent further enforcement.</p>

    </div>
  );
};

export default TermsAndConditions;
