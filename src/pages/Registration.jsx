import {  useState } from "react";

import { firebaseAuth } from "../services/firebase.service";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getImageUrl } from "../services/util.service";
import {
  authService,
  getDemoCountries,
} from "../services/auth.service";
import { userService } from "../services/user.service";

export const Registration = () => {
  // const { isLoading, data } = useQuery("getCountries", () =>
  //   getCountries("https://restcountries.com/v3.1/all")
  // );
  const data = getDemoCountries();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [userCountryLocation, setUserCountryLocation] = useState("Israel");
  const [opt, setOpt] = useState("");
  const [isSmsSend, setIsSmsSend] = useState(false);
  const { auth } = firebaseAuth;
  auth.settings.appVerificationDisabledForTesting = true;

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
        },
      },
      firebaseAuth.auth
    );
  };
  const phoneAuth = async (ev) => {
    ev.preventDefault();
    const phoneNumberWithCode = getCountryCode() + phoneNumber;
    generateRecaptcha();
    const appVerifire = window.recaptchaVerifier;
    try {
      const res = await signInWithPhoneNumber(
        firebaseAuth.auth,
        phoneNumberWithCode,
        appVerifire
      );
      window.confirmationResult = res;
      setIsSmsSend(true);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOPT = async (ev) => {
    ev.preventDefault();
    const confirmationReq = window.confirmationResult;
    try {
      const confirmationRqst = await confirmationReq.confirm(opt);
      const user = confirmationRqst.user;
      const { displayName, phoneNumber } = user;
      const userFormat = userService.getEmptyUser(displayName, phoneNumber);
      console.log(phoneNumber);
      await authService.signIn(userFormat);
    } catch (err) {
      console.log(err);
    }
  };

  const getCountryCode = () => {
    const selectedCountry = data?.find(
      (country) => country.name.common === userCountryLocation
    );
    const { idd } = selectedCountry;
    return idd.root + idd.suffixes[0];
  };
  return (
    <section className="register-page flex">
      <div className="user-details flex column align-center justify-center">
        <div className="title">Verify your phone number</div>
        {!isSmsSend ? (
          <p>
            WhatsApp will send an SMS message to verify your phone number. Enter
            your country code and phone number:
          </p>
        ) : (
          <p>
            Please check your phone number for OPT code to verify your account
          </p>
        )}
        {!isSmsSend && (
          <form onSubmit={phoneAuth} className="flex column">
            <select
              className="countries"
              onChange={(ev) => setUserCountryLocation(ev.target.value)}
              defaultValue={"Israel"}
            >
              {data
                ?.sort((a, b) =>
                  a.name.common.toLowerCase() > b.name.common.toLowerCase()
                    ? 1
                    : -1
                )
                .map((country, idx) => (
                  <option key={idx} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
            </select>
            <div>
              <div className="user-number flex">
                <input
                  className="country-code"
                  type="text"
                  readOnly
                  value={getCountryCode()}
                />
                <input
                  className="phone-number"
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
                  maxLength="10"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button>Next</button>
            </div>
          </form>
        )}
        {isSmsSend && (
          <form onSubmit={verifyOPT}>
            <div className="user-number flex column">
              <div>
                <input
                  onChange={(ev) => setOpt(ev.target.value)}
                  maxLength="6"
                />
              </div>
              <button>verify code</button>
            </div>
          </form>
        )}
      </div>
      <div className="welcome flex column align-center justify-center">
        <img src={getImageUrl("/img/background-login.svg")} alt="" />
        <div className="title">WhatsApp Web</div>
        <p>
          Now send and receive messages without keeping your phone online. Use
          WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
        <hr />
        <p>End-to-end encrypted</p>
      </div>
      <div id="recaptcha-container"></div>
    </section>
  );
};

//666666
// +1 650-555-3434
