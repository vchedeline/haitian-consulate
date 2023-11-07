import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "components/Input";

export const FormspreeForm = ({ formId }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <div className="flex flex-col max-w-5xl mx-auto my-5 justify-items-center items-center">
        <Image
          src={"/bluecheck.png"}
          width={350}
          height={350}
          className="mx-auto"
          alt=""
        />
        <h1 className="text-xl font-bold mx-auto my-4">Thank you!</h1>
        <p>
          We've received your message. <br /> Someone from our team will contact
          you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 mx-auto my-2"
      name="form"
    >
      <Input
        id="name"
        type="name"
        name="name"
        className="inputForm"
        placeholder="Name"
      />
      <ValidationError prefix="Name" field="name" errors={state.errors} />
      <Input
        id="email"
        type="email"
        name="email"
        className="inputForm"
        placeholder="Email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <Input
        id="subject"
        type="subject"
        name="subject"
        className="inputForm"
        placeholder="Subject"
      />
      <ValidationError prefix="Subject" field="subject" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        rows="6"
        className="textAreaForm"
        placeholder="Message"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <div>
        <button
          name="submitBtn"
          className="btnForm"
          type="submit"
          disabled={state.submitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
