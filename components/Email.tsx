const Email = ({
  name,
  content,
  verificationLink,
  verificationCode,
}: {
  name: string
  content: string
  verificationLink?: string
  verificationCode?: string
}) => {
  return (
    <div className="mx-auto max-w-md rounded-md bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Welcome to Swift Auth
      </h1>
      <p className="mb-4 text-center text-lg">Hello {name},</p>
      <p className="mb-4 text-center text-base">{content}</p>
      {verificationLink && (
        <a
          href={verificationLink}
          className="mb-4 block text-center text-blue-500 hover:underline"
        >
          {verificationLink}
        </a>
      )}
      {verificationCode && (
        <p className="text-2xl font-bold">{verificationCode}</p>
      )}
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
