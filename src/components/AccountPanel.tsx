import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccountMode = "login" | "register";

type StoredUser = {
  email: string;
  name: string;
  password: string;
  createdAt: string;
};

const USERS_STORAGE_KEY = "guitar-guide-users";
const CONSENT_STORAGE_KEY = "guitar-guide-cookie-consent";
const SESSION_COOKIE_KEY = "guitar_guide_session";
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const TEXT = {
  buttonOpen: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
  buttonClose: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
  eyebrow: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
  title: "\u0412\u0445\u043e\u0434, \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0438 cookie",
  description:
    "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u0445\u0440\u0430\u043d\u044f\u0442\u0441\u044f \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435, \u0430 cookie \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u044e\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u0443\u044e \u0441\u0435\u0441\u0441\u0438\u044e \u043c\u0435\u0436\u0434\u0443 \u043f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u044f\u043c\u0438 \u0441\u0430\u0439\u0442\u0430.",
  login: "\u0412\u0445\u043e\u0434",
  register: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f",
  name: "\u0418\u043c\u044f",
  email: "Email",
  password: "\u041f\u0430\u0440\u043e\u043b\u044c",
  placeholderName: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, \u0421\u0435\u043c\u0451\u043d",
  placeholderPassword: "\u041c\u0438\u043d\u0438\u043c\u0443\u043c 4 \u0441\u0438\u043c\u0432\u043e\u043b\u0430",
  submitLogin: "\u0412\u043e\u0439\u0442\u0438",
  submitRegister: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442",
  sessionTitle: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u0435\u0441\u0441\u0438\u0438",
  noUser: "\u0421\u0435\u0439\u0447\u0430\u0441 \u043d\u0438\u043a\u0442\u043e \u043d\u0435 \u0432\u043e\u0448\u0451\u043b \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442.",
  noUserHint:
    "\u041f\u043e\u0441\u043b\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438\u043b\u0438 \u0432\u0445\u043e\u0434\u0430 \u0437\u0434\u0435\u0441\u044c \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c.",
  currentUser: "\u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u043e\u0448\u0451\u043b",
  cookiesOn: "\u0432\u043a\u043b\u044e\u0447\u0435\u043d\u044b",
  cookiesOff: "\u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u044b",
  logout: "\u0412\u044b\u0439\u0442\u0438",
  usersSaved: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442\u043e\u0432 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e",
  consentState: "Cookie consent",
  consentUnknown: "\u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",
  consentAccepted: "accepted",
  consentDeclined: "declined",
  bannerTitle: "Cookie \u0434\u043b\u044f \u0432\u0445\u043e\u0434\u0430",
  bannerText:
    "\u0420\u0430\u0437\u0440\u0435\u0448\u0438 cookie, \u0435\u0441\u043b\u0438 \u0445\u043e\u0447\u0435\u0448\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u0430\u043a\u0442\u0438\u0432\u043d\u0443\u044e \u0441\u0435\u0441\u0441\u0438\u044e \u043f\u043e\u0441\u043b\u0435 \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b.",
  allow: "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c",
  decline: "\u041e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u044c"
} as const;

const readUsers = (): StoredUser[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const readCookie = (name: string) => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : "";
};

const writeSessionCookie = (email: string) => {
  document.cookie = `${SESSION_COOKIE_KEY}=${encodeURIComponent(email)}; path=/; max-age=${SESSION_COOKIE_MAX_AGE}; samesite=lax`;
};

const clearSessionCookie = () => {
  document.cookie = `${SESSION_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
};

export function AccountPanel() {
  const [mode, setMode] = useState<AccountMode>("login");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUsers = readUsers();
    setUsers(storedUsers);

    const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent === "accepted") {
      setCookieConsent(true);
    } else if (savedConsent === "declined") {
      setCookieConsent(false);
    } else {
      setCookieConsent(null);
    }

    const sessionEmail = readCookie(SESSION_COOKIE_KEY);
    if (!sessionEmail) {
      return;
    }

    const matchedUser = storedUsers.find((user) => user.email === sessionEmail) ?? null;
    setCurrentUser(matchedUser);
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    setCookieConsent(true);
    setMessage("\u041a\u0443\u043a\u0438 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u044b. \u0412\u0445\u043e\u0434 \u0431\u0443\u0434\u0435\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c\u0441\u044f \u043c\u0435\u0436\u0434\u0443 \u043f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u044f\u043c\u0438.");
  };

  const declineCookies = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    clearSessionCookie();
    setCookieConsent(false);
    setCurrentUser(null);
    setMessage("\u041a\u0443\u043a\u0438 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u044b. \u0410\u043a\u043a\u0430\u0443\u043d\u0442\u044b \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u044e\u0442\u0441\u044f \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e, \u043d\u043e \u0441\u0435\u0441\u0441\u0438\u044f \u043d\u0435 \u0437\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u0435\u0442\u0441\u044f.");
  };

  const handleRegister = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    if (!normalizedName || !normalizedEmail || password.trim().length < 4) {
      setMessage("\u0417\u0430\u043f\u043e\u043b\u043d\u0438 \u0438\u043c\u044f, email \u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043a\u043e\u0440\u043e\u0447\u0435 4 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432.");
      return;
    }

    if (users.some((user) => user.email === normalizedEmail)) {
      setMessage("\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u0441 \u0442\u0430\u043a\u0438\u043c email \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.");
      return;
    }

    const nextUser: StoredUser = {
      email: normalizedEmail,
      name: normalizedName,
      password,
      createdAt: new Date().toISOString()
    };

    const nextUsers = [...users, nextUser];
    saveUsers(nextUsers);
    setUsers(nextUsers);
    setCurrentUser(nextUser);

    if (cookieConsent) {
      writeSessionCookie(nextUser.email);
      setMessage(`\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u0441\u043e\u0437\u0434\u0430\u043d. \u0421 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0435\u043d\u0438\u0435\u043c, ${nextUser.name}! \u0421\u0435\u0441\u0441\u0438\u044f \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430 \u0432 cookie.`);
    } else {
      clearSessionCookie();
      setMessage(`\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u0441\u043e\u0437\u0434\u0430\u043d. \u041f\u0440\u0438\u0432\u0435\u0442, ${nextUser.name}! Cookie \u043f\u043e\u043a\u0430 \u043d\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442\u0441\u044f.`);
    }

    resetForm();
  };

  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password
    );

    if (!matchedUser) {
      setMessage("\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c.");
      return;
    }

    setCurrentUser(matchedUser);

    if (cookieConsent) {
      writeSessionCookie(matchedUser.email);
      setMessage(`\u0412\u0445\u043e\u0434 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d. \u041f\u0440\u0438\u0432\u0435\u0442, ${matchedUser.name}! Cookie \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u044b.`);
    } else {
      clearSessionCookie();
      setMessage(`\u0412\u0445\u043e\u0434 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d. \u041f\u0440\u0438\u0432\u0435\u0442, ${matchedUser.name}! \u0411\u0435\u0437 cookie \u0441\u0435\u0441\u0441\u0438\u044f \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u0441\u044f.`);
    }

    resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "register") {
      handleRegister();
      return;
    }

    handleLogin();
  };

  const handleLogout = () => {
    clearSessionCookie();
    setCurrentUser(null);
    setMessage("\u0422\u044b \u0432\u044b\u0448\u0435\u043b \u0438\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430. Cookie \u0441\u0435\u0441\u0441\u0438\u0438 \u043e\u0447\u0438\u0449\u0435\u043d\u044b.");
  };

  const consentLabel =
    cookieConsent === null
      ? TEXT.consentUnknown
      : cookieConsent
        ? TEXT.consentAccepted
        : TEXT.consentDeclined;

  return (
    <>
      <button className="account-launcher" type="button" onClick={() => setIsOpen(true)}>
        {currentUser ? currentUser.name : TEXT.buttonOpen}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="account-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="account-modal__backdrop" type="button" aria-label={TEXT.buttonClose} onClick={() => setIsOpen(false)} />

            <motion.section
              className="account-sheet"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="account-sheet__topbar">
                <div className="account-panel__intro">
                  <span className="account-panel__eyebrow">{TEXT.eyebrow}</span>
                  <h2>{TEXT.title}</h2>
                  <p>{TEXT.description}</p>
                </div>

                <button className="account-sheet__close" type="button" onClick={() => setIsOpen(false)}>
                  {TEXT.buttonClose}
                </button>
              </div>

              <div className="account-panel__grid">
                <div className="account-card">
                  <div className="account-card__tabs" role="tablist" aria-label="\u0420\u0435\u0436\u0438\u043c \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430">
                    <button
                      type="button"
                      className={mode === "login" ? "is-active" : undefined}
                      onClick={() => setMode("login")}
                    >
                      {TEXT.login}
                    </button>
                    <button
                      type="button"
                      className={mode === "register" ? "is-active" : undefined}
                      onClick={() => setMode("register")}
                    >
                      {TEXT.register}
                    </button>
                  </div>

                  <form className="account-form" onSubmit={handleSubmit}>
                    {mode === "register" ? (
                      <label>
                        <span>{TEXT.name}</span>
                        <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder={TEXT.placeholderName}
                        />
                      </label>
                    ) : null}

                    <label>
                      <span>{TEXT.email}</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                      />
                    </label>

                    <label>
                      <span>{TEXT.password}</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={TEXT.placeholderPassword}
                      />
                    </label>

                    <button className="account-form__submit" type="submit">
                      {mode === "login" ? TEXT.submitLogin : TEXT.submitRegister}
                    </button>
                  </form>
                </div>

                <div className="account-card account-card--status">
                  <h3>{TEXT.sessionTitle}</h3>
                  {currentUser ? (
                    <>
                      <p>
                        {TEXT.currentUser}: <strong>{currentUser.name}</strong>
                      </p>
                      <p>Email: {currentUser.email}</p>
                      <p>
                        Cookie: {cookieConsent ? TEXT.cookiesOn : TEXT.cookiesOff}
                      </p>
                      <button
                        className="account-form__submit account-form__submit--ghost"
                        type="button"
                        onClick={handleLogout}
                      >
                        {TEXT.logout}
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{TEXT.noUser}</p>
                      <p>{TEXT.noUserHint}</p>
                    </>
                  )}

                  <div className="account-card__meta">
                    <span>{TEXT.usersSaved}: {users.length}</span>
                    <span>{TEXT.consentState}: {consentLabel}</span>
                  </div>
                </div>
              </div>

              {message ? <p className="account-panel__message">{message}</p> : null}

              {cookieConsent === null ? (
                <div className="cookie-banner" role="status" aria-live="polite">
                  <div>
                    <strong>{TEXT.bannerTitle}</strong>
                    <p>{TEXT.bannerText}</p>
                  </div>
                  <div className="cookie-banner__actions">
                    <button type="button" onClick={acceptCookies}>{TEXT.allow}</button>
                    <button type="button" className="is-secondary" onClick={declineCookies}>{TEXT.decline}</button>
                  </div>
                </div>
              ) : null}
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}