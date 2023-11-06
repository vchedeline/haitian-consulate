import { useForm, ValidationError } from "@formspree/react";
import { Input } from "components/Input";

export const FormspreeForm = ({ formId }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return <p className="max-w-5xl mx-auto my-5">Thanks for joining!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
        <button class="btnForm" type="submit" disabled={state.submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
