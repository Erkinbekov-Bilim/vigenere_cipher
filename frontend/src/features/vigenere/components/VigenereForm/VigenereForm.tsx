import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../app/hooks/reduxHooks';
import { postMessageDecode, postMessageEncode } from '../../vigenere.api';
import {
  selectDecodedMessage,
  selectEncodedMessage,
} from '../../vigenere.selectors';
import type { IVigenereMutation } from '../../../../types/vigenere/vigenere-mutation.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const defaultValues: IVigenereMutation = {
  messageDecode: '',
  messageEncode: '',
  password: '',
};

const VigenereForm = () => {
  const dispatch = useAppDispatch();
  const encodedMessage = useAppSelector(selectEncodedMessage);
  const decodedMessage = useAppSelector(selectDecodedMessage);

  const { register, handleSubmit, setValue, setFocus } =
    useForm<IVigenereMutation>({
      defaultValues,
    });

  useEffect(() => {
    if (encodedMessage) {
      setValue('messageEncode', '');
      setValue('messageDecode', encodedMessage.encoded);
      setFocus('messageDecode');
    }
  }, [encodedMessage, setValue, setFocus]);

  useEffect(() => {
    if (decodedMessage) {
      setValue('messageDecode', '');
      setValue('messageEncode', decodedMessage.decoded);
      setFocus('messageEncode');
    }
  }, [decodedMessage, setValue, setFocus]);

  const onEncode = (data: IVigenereMutation) => {
    dispatch(
      postMessageEncode({
        message: data.messageEncode,
        password: data.password,
      }),
    );
  };

  const onDecode = (data: IVigenereMutation) => {
    dispatch(
      postMessageDecode({
        message: data.messageDecode,
        password: data.password,
      }),
    );
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <TextField
            sx={{ width: '100%' }}
            {...register('messageEncode')}
            label="Plain text"
            multiline
            rows={5}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <TextField
              {...register('password')}
              label="Password"
              sx={{ width: '250px' }}
              type="password"
            />
            <Button variant="contained" onClick={handleSubmit(onEncode)}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button variant="contained" onClick={handleSubmit(onDecode)}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
          </Box>

          <TextField
            sx={{ width: '100%' }}
            {...register('messageDecode')}
            label="Cipher text"
            multiline
            rows={5}
          />
        </Box>
      </form>
    </Box>
  );
};

export default VigenereForm;
