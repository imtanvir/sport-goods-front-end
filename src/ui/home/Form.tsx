import { debounce } from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSendFeedbackMutation } from "../../redux/api/baseApi";
const Form = () => {
  const { register, handleSubmit } = useForm<{
    email: string;
    message: string;
  }>();

  const [sendFeedback] = useSendFeedbackMutation();
  const onSubmit = async (data: { email: string; message: string }) => {
    const toastId = toast.loading("Logging In");
    try {
      const feedback = {
        email: data.email,
        message: data.message,
      };
      await sendFeedback(feedback);
      toast.success("Thank you for your feedback", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const debounceOnSubmit = debounce(onSubmit, 2000);
  return (
    <div className="py-20">
      <div className=" container">
        <h1 className=" text-center text-4xl leading-16">Contact With Us</h1>
        <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg shadow-lg bg-white p-8">
          <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
            Feedback
          </h2>
          <p className="mb-5 leading-relaxed text-gray-600">
            If you had any issues or you liked our product, please share with
            us!
          </p>
          <form
            onSubmit={handleSubmit(
              debounceOnSubmit as SubmitHandler<{
                email: string;
                message: string;
              }>
            )}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm leading-7 text-gray-600"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="text-sm leading-7 text-gray-600"
              >
                Message
              </label>
              <textarea
                {...register("message")}
                id="message"
                name="message"
                className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
            >
              Send
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            Feel free to connect with us to share your concern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
