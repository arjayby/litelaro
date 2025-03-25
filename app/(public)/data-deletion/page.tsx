export default function DataDeletionPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-center font-instrument-serif text-4xl font-normal">
        Data Deletion Instructions
      </h1>
      <div className="prose prose-neutral max-w-none">
        <p>Last updated: February 22, 2025</p>

        <h2>How to Delete Your Data</h2>
        <p>
          You have the right to request the deletion of your personal data from
          Litelaro. Here are the steps to delete your data:
        </p>

        <h3>Option 1: Account Settings</h3>
        <ol>
          <li>Log in to your account</li>
          <li>Navigate to Account Settings</li>
          <li>Select &quot;Delete Account&quot;</li>
          <li>Confirm your decision</li>
        </ol>

        <h3>Option 2: Contact Us</h3>
        <p>
          Send a data deletion request to{" "}
          <a href="mailto:arjayby1@gmail.com">arjayby1@gmail.com</a> with:
        </p>
        <ul>
          <li>Your registered email address</li>
          <li>Subject line: &quot;Data Deletion Request&quot;</li>
          <li>Brief explanation of your request</li>
        </ul>

        <h2>Third-Party Data</h2>
        <p>
          If you signed up using a third-party service, you may also need to:
        </p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/help/delete_account"
              target="_blank"
              rel="noopener noreferrer"
            >
              Delete your Facebook connected app data
            </a>
          </li>
          <li>
            <a
              href="https://myaccount.google.com/data-and-privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage your Google connected app data
            </a>
          </li>
        </ul>

        <h2>Processing Time</h2>
        <p>
          We will process your deletion request within 30 days. You will receive
          a confirmation email once your data has been completely removed from
          our systems.
        </p>

        <h2>Data Retention</h2>
        <p>
          Some information may be retained for legal, security, or business
          requirements. Any retained data will be handled in accordance with our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about data deletion, please contact us at:{" "}
          <a href="mailto:arjayby1@gmail.com">arjayby1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
