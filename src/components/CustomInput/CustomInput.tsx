interface CustomInputProps {
    placeholder:string;
    text:string;
}

export const CustomInput = (props: CustomInputProps) => {
  return (
    <section className="custom-input">
      <div className="custom-input__preview flex align-center justify-center">
        <input className="custom-input__input full-grow" {...props} />
      </div>
    </section>
  );
};
