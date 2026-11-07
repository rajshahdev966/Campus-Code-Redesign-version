import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useDemoCaptcha from "../../hooks/useDemoCaptcha";

export default function RegisterPage() {
  const [visiblePasswords, setVisiblePasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { code, image, refreshCaptcha } = useDemoCaptcha();
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      accountType: "student",
      password: "",
      confirmPassword: "",
      captcha: "",
      isAdult: false,
    },
  });

  function onSubmit(data) {
    console.log("CampusCode registration form:", data);
    setSubmitted(true);
  }

  return (
    <>
      <section className="auth-panel" aria-labelledby="register-title">
        <div className="relative border-b border-line pb-6">
          <p className="auth-label">New account</p>
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 font-mono text-[9px] leading-4 text-muted/50"
          >
            CC
            <br />
            02
          </span>
          <h2
            id="register-title"
            className="mt-3 text-[40px] font-bold leading-none tracking-[-2.5px]"
          >
            REGISTER
          </h2>
          <p className="mt-3 text-[11px] text-muted/80">
            Create your CampusCode account.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-4"
        >
          <div>
            <label htmlFor="register-name" className="auth-label">
              Full name
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="auth-field-icon">
                ◇
              </span>
              <input
                id="register-name"
                autoComplete="name"
                placeholder="Your full name"
                className="auth-input pl-12"
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? "register-name-error" : undefined
                }
                {...register("fullName", {
                  required: "Enter your full name.",
                  validate: (value) =>
                    value.trim().length >= 2 ||
                    "Enter at least two characters.",
                })}
              />
            </div>
            {errors.fullName && (
              <p id="register-name-error" className="auth-error">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="register-email" className="auth-label">
              Email address
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="auth-field-icon">
                @
              </span>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="auth-input pl-12"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
                {...register("email", {
                  required: "Enter your email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p id="register-email-error" className="auth-error">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="register-account-type" className="auth-label">
              Account type
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="auth-field-icon">
                🎓
              </span>
              <input
                id="register-account-type"
                readOnly
                className="auth-input pl-12 uppercase text-muted"
                {...register("accountType")}
              />
            </div>
            <p className="mt-2.5 text-[12px] leading-5 text-muted">
              Organizer? Accounts are created by our team — contact{" "}
              <a
                href="mailto:campuscode@gmail.com"
                className="font-semibold text-purple"
              >
                campuscode@gmail.com
              </a>
            </p>
          </div>
          {[
            {
              name: "password",
              label: "Password",
              placeholder: "Create a password",
            },
            {
              name: "confirmPassword",
              label: "Confirm password",
              placeholder: "Repeat your password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={"register-" + field.name} className="auth-label">
                {field.label}
              </label>
              <div className="relative mt-2">
                <span aria-hidden="true" className="auth-field-icon">
                  •
                </span>
                <input
                  id={"register-" + field.name}
                  type={visiblePasswords[field.name] ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={field.placeholder}
                  className="auth-input pr-20 pl-12"
                  aria-invalid={!!errors[field.name]}
                  aria-describedby={
                    errors[field.name] ? field.name + "-error" : undefined
                  }
                  {...register(
                    field.name,
                    field.name === "password"
                      ? {
                          required: "Create a password.",
                          minLength: {
                            value: 8,
                            message: "Use at least eight characters.",
                          },
                          deps: ["confirmPassword"],
                        }
                      : {
                          required: "Confirm your password.",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Your passwords do not match.",
                        },
                  )}
                />
                <button
                  type="button"
                  aria-label={
                    (visiblePasswords[field.name] ? "Hide " : "Show ") +
                    field.label.toLowerCase()
                  }
                  aria-pressed={visiblePasswords[field.name]}
                  onClick={() =>
                    setVisiblePasswords((previous) => ({
                      ...previous,
                      [field.name]: !previous[field.name],
                    }))
                  }
                  className="auth-password-toggle border border-line bg-canvas px-2.5 py-2"
                >
                  {visiblePasswords[field.name] ? "◉ HIDE" : "○ SHOW"}
                </button>
              </div>
              {errors[field.name] && (
                <p id={field.name + "-error"} className="auth-error">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="register-captcha" className="auth-label">
              Captcha
            </label>
            <div className="mt-2 mb-2 flex items-center gap-4">
              <img
                src={image}
                alt="Demo CAPTCHA challenge"
                width="152"
                height="52"
                className="rounded-[7px] border border-line"
              />
              <button
                type="button"
                onClick={() => {
                  refreshCaptcha();
                  resetField("captcha");
                  setSubmitted(false);
                }}
                className="font-mono text-[11px] font-medium tracking-[1px] text-purple"
                aria-label="New CAPTCHA"
              >
                ↻ NEW
              </button>
            </div>
            <input
              id="register-captcha"
              autoComplete="off"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter the code above"
              className="auth-input"
              aria-invalid={!!errors.captcha}
              aria-describedby={
                errors.captcha ? "register-captcha-error" : undefined
              }
              {...register("captcha", {
                required: "Enter the code shown above.",
                validate: (value) =>
                  value === code || "The code does not match. Try again.",
              })}
            />
            {errors.captcha && (
              <p id="register-captcha-error" className="auth-error">
                {errors.captcha.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex cursor-pointer items-center gap-3 border border-line bg-canvas/60 px-3.5 py-3.5 text-[12px]">
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-purple"
                aria-invalid={!!errors.isAdult}
                aria-describedby={
                  errors.isAdult ? "register-age-error" : undefined
                }
                {...register("isAdult", {
                  required: "Confirm that you are 18 years of age or older.",
                })}
              />
              <span>
                I confirm that I am{" "}
                <span className="font-semibold text-purple">
                  18 years of age or older.
                </span>
              </span>
            </label>
            {errors.isAdult && (
              <p id="register-age-error" className="auth-error">
                {errors.isAdult.message}
              </p>
            )}
          </div>
          <button type="submit" className="auth-submit gap-4">
            <svg
              viewBox="0 0 52 30"
              aria-hidden="true"
              className="w-11 shrink-0"
            >
              <rect width="52" height="30" rx="7" fill="white" />
              <path d="M12 5H23L17 25H6Z" fill="var(--ink)" />
              <path d="M26 5H37L31 25H20Z" fill="var(--purple)" />
              <path d="M40 5H49L43 25H34Z" fill="var(--lime)" />
            </svg>
            <span>Send verification code</span>
            <span aria-hidden="true" className="text-lg text-lime">
              ↗
            </span>
          </button>
          <p role="status" className="font-mono text-[9px] text-purple">
            {submitted
              ? "Demo data logged to the console. No verification email was sent."
              : ""}
          </p>
        </form>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[8px] uppercase">
          <span className="text-muted">Already have an account?</span>
          <Link to="/login" className="text-purple hover:underline">
            Login →
          </Link>
        </div>
      </section>
      <div className="auth-panel-caption">
        <span>Auth / 2026</span>
        <span>
          <span className="mr-1.5 inline-block size-1 rounded-full bg-lime" />
          Secure registration
        </span>
      </div>
    </>
  );
}
