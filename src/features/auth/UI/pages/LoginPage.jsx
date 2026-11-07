import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useDemoCaptcha from "../../hooks/useDemoCaptcha";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { code, image, refreshCaptcha } = useDemoCaptcha();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "", captcha: "" } });

  function onSubmit(data) {
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
            className="mt-3 text-[40px] font-bold leading-none tracking-[-2.5px]"
          >
            LOGIN
          </h2>
          <p className="mt-3 text-[11px] text-muted/80">
            Access your CampusCode account.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="group mt-7 space-y-5"
        >
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
                className="font-mono text-[8px] text-muted transition-colors hover:text-purple"
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
            <div
              aria-hidden="true"
              className="relative mb-1 flex h-16 items-center justify-between overflow-hidden rounded-xl border border-dashed border-line bg-canvas/40 px-3"
            >
              <div className="flex items-start transition-transform duration-700 group-focus-within:translate-x-3">
                <svg viewBox="0 0 86 44" className="mt-1 w-[76px]">
                  <rect
                    x="1"
                    y="4"
                    width="83"
                    height="34"
                    rx="9"
                    fill="var(--ink)"
                  />
                  <path d="M17 10H30L23 29H10Z" fill="white" />
                  <path d="M35 10H48L41 29H28Z" fill="var(--purple)" />
                  <path d="M53 10H66L59 29H46Z" fill="var(--lime)" />
                  <circle
                    cx="20"
                    cy="38"
                    r="6"
                    fill="var(--ink)"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx="66"
                    cy="38"
                    r="6"
                    fill="var(--ink)"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
                <span className="ml-2 font-mono text-xs text-muted">Zzz</span>
              </div>
              <span className="self-start pt-3 font-mono text-[10px] font-semibold tracking-[1px] text-muted">
                READY
              </span>
              <span className="absolute right-3 top-4 h-9 w-[3px] bg-lime" />
            </div>
            <button type="submit" className="auth-submit">
              <span>LOGIN</span>
              <span aria-hidden="true" className="text-lg text-lime">
                ↗
              </span>
            </button>
          </div>
          <p role="status" className="min-h-4 font-mono text-[9px] text-purple">
            {submitted ? "Demo form data logged to the console." : ""}
          </p>
        </form>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[8px] uppercase">
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
