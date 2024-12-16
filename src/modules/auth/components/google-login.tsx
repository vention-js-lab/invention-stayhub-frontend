import { type CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLoginMutation } from '../api/google-login.api';
import { useAuth } from '#/shared/hooks/auth.hook';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthStatus, setCurrentUser } from '#/redux/slices/auth-slice';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';

interface DecodedGoogleResponse {
  email: string;
  given_name: string;
  family_name?: string;
  picture?: string;
  sub: string;
}

export function GoogleAuthLogin() {
  const loginMutation = useGoogleLoginMutation();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    if (!credential) {
      showSnackbar({ message: 'Credential is missing from the response', variant: 'error' });
      return;
    }

    try {
      const decodedResponse: DecodedGoogleResponse = jwtDecode(credential);

      const googleUser = {
        email: decodedResponse.email,
        firstName: decodedResponse.given_name,
        lastName: decodedResponse.family_name,
        picture: decodedResponse.picture,
        googleId: decodedResponse.sub,
      };

      loginMutation.mutate(googleUser, {
        onSuccess: (data) => {
          const user = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };

          login(user);
          dispatch(setCurrentUser(user));
          dispatch(setAuthStatus('authenticated'));
          navigate('/');

          showSnackbar({ message: 'Logged in successfully with Google', variant: 'success' });
        },
        onError: () => {
          showSnackbar({ message: 'Error logging in with Google', variant: 'error' });
        },
      });
    } catch {
      showSnackbar({ message: 'Error during Google login-catch', variant: 'error' });
    }
  };

  const handleError = () => {
    showSnackbar({ message: 'Error logging in with Google oxiri', variant: 'error' });
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
