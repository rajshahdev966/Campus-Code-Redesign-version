import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useDemoCaptcha from "../../hooks/useDemoCaptcha";
import useFormBus from "../../hooks/useFormBus";
import FormBus from "../components/FormBus";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { code, image, refreshCaptcha } = useDemoCaptcha();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid, isSubmitting, submitCount },
  } = useForm({ mode: "onTouched", defaultValues: { email: "", password: "", captcha: "" } });
  const { status, drive } = useFormBus({ errors, isDirty, isValid });

  async function onSubmit(data) {
    setSubmitted(false);
    if (!(await drive())) return;
    console.log("CampusCode login form:", data);
    setSubmitted(true);
  }

  return (
    <>
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="relative border-b border-line pb-6">
          <p className="auth-label">Existing account</p>
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 font-mono text-[9px] leading-4 text-muted/50"
          >
            CC
            <br />
            01
          </span>
          <h2
            id="login-title"
            className="auth-form-title"
          >
            LOGIN
          </h2>
          <p className="auth-form-description">
            Access your CampusCode account.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          onInput={() => setSubmitted(false)}
          aria-busy={isSubmitting}
          className="auth-form group"
        >
          <fieldset disabled={isSubmitting} className="auth-form-fields">
          <div>
            <label htmlFor="login-email" className="auth-label">
              Email address
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="auth-field-icon">
                @
              </span>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="auth-input pl-12"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
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
              <p id="login-email-error" className="auth-error">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="login-password" className="auth-label">
              Password
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="auth-field-icon">
                •
              </span>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="auth-input pr-20 pl-12"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
                {...register("password", { required: "Enter your password." })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="auth-password-toggle"
              >
                {showPassword ? "◉ HIDE" : "○ SHOW"}
              </button>
            </div>
            {errors.password && (
              <p id="login-password-error" className="auth-error">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="login-captcha" className="auth-label">
              Captcha
            </label>
            <div className="mt-2 mb-2 flex items-center gap-5">
              <img
                src={image}
                alt="Demo CAPTCHA challenge"
                width="152"
                height="52"
                className="rounded-[7px] border border-ink/70"
              />
              <button
                type="button"
                className="auth-refresh"
                aria-label="New CAPTCHA"
                onClick={() => {
                  refreshCaptcha();
                  resetField("captcha");
                  setSubmitted(false);
                }}
              >
                ↻ NEW
              </button>
            </div>
            <input
              id="login-captcha"
              autoComplete="off"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter the code above"
              className="auth-input"
              aria-invalid={!!errors.captcha}
              aria-describedby={
                errors.captcha ? "login-captcha-error" : undefined
              }
              {...register("captcha", {
                required: "Enter the code shown above.",
                validate: (value) =>
                  value === code || "The code does not match. Try again.",
              })}
            />
            {errors.captcha && (
              <p id="login-captcha-error" className="auth-error">
                {errors.captcha.message}
              </p>
            )}
          </div>
          <div>
            <FormBus status={status} attempt={submitCount} />
            <button type="submit" disabled={isSubmitting} className="auth-submit">
              <span>{isSubmitting ? "Submitting…" : "LOGIN"}</span>
              <span aria-hidden="true" className="text-lg text-ink">
                ↗
              </span>
            </button>
          </div>
          </fieldset>
          <p role="status" className="auth-feedback">
            {submitted ? "Demo form data logged to the console." : ""}
          </p>
        </form>
        <div className="auth-switch">
          <span className="text-muted">Don’t have an account?</span>
          <Link to="/register" className="text-purple hover:underline">
            Create account →
          </Link>
        </div>
      </section>
      <div className="auth-panel-caption">
        <span>Auth / 2026</span>
        <span>
          <span className="mr-1.5 inline-block size-1 rounded-full bg-lime" />
          Secure login
        </span>
      </div>
    </>
  );
}
