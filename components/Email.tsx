interface EmailProps {
  name: string
  verificationLink: string
}

const Email = ({ name, verificationLink }: EmailProps) => {
  return (
    <div className="mx-auto max-w-md rounded-md bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Welcome to Swift Auth
      </h1>
      <p className="mb-4 text-center text-lg">Hello {name},</p>
      <p className="mb-4 text-center text-base">
        Thank you for joining Swift Auth! To complete your registration, please
        click the confirmation link below:
      </p>
      <a
        href={verificationLink}
        className="mb-4 block text-center text-blue-500 hover:underline"
      >
        {verificationLink}
      </a>
      <p className="mb-4 text-center text-sm">
        If you have any questions or need further assistance, feel free to
        contact our support team.
      </p>
      <p className="text-center text-base">
        Best regards,
        <br />
        The Swift Auth Team
      </p>
    </div>
  )
}

export default Email
