import classes from './RequestChangeOwnerContact.module.css';
import { Card, Text, Row, Button, Loading } from '@nextui-org/react';
import { MdEmail } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { TiLocation } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import FetchApi from '../../api/FetchApi';
import { ContactApis } from '../../api/ListApi';
import { useParams, useNavigate } from 'react-router-dom';

const RequestChangeOwnerContact = ({ title }) => {
  const [data, setData] = useState(null);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const { id, code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title
    FetchApi(ContactApis.requestChangeOwnerContact, undefined, undefined, [
      id,
      code,
    ])
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch(() => {
        navigate('/404', { replace: true });
      });
  }, []);

  const handlerAccept = () => {
    setLoadingAccept(true);
    setTimeout(() => {
      setLoadingAccept(false);
    }, 2000);
  };

  const handlerReject = () => {
    setLoadingReject(true);
    setTimeout(() => {
      setLoadingReject(false);
    }, 2000);
  };

  return (
    <div className={classes.main}>
      <Card css={{ mw: '500px', h: '270px', margin: '0 auto', padding: 30 }}>
        {!data && (
          <div className={classes.loadingCard}>
            <Loading>Getting data ...</Loading>
          </div>
        )}
        {data && (
          <div className={classes.card}>
            <div>
              <p className={classes.name}>{data.contact.nameCt}</p>
              <p className={classes.jobTitle}>{data.contact.jobCt}</p>
              <p className={classes.company}>{data.contact.companyCt}</p>
            </div>
            <div>
              <div className={classes.line}>
                <MdEmail size={20} />
                <p>{data.contact.emailCt}</p>
              </div>
              <div className={classes.line}>
                <BsTelephoneFill size={20} />
                <p>{data.contact.phoneCt}</p>
              </div>
              <div className={classes.line}>
                <TiLocation size={20} />
                <p>{data.contact.addressCt}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
      {data && (
        <Card css={{ mw: '500px', margin: '20px auto', padding: 30 }}>
          <h1 className={classes.title}>Confirm change owner contact</h1>
          <p className={classes.req}>
            Receiver: <span>{data.receiver}</span>
          </p>
          <p className={classes.req}>
            Requester: <span>{data.requester}</span>
          </p>
          <div className={classes.button}>
            <Button
              onClick={handlerAccept}
              disabled={loadingReject || loadingAccept}
              css={{ width: 100 }}
              color={'success'}
              auto
            >
              {!loadingAccept && 'Accept'}
              {loadingAccept && <Loading size="xs" />}
            </Button>
            <Button
              onClick={handlerReject}
              disabled={loadingReject || loadingAccept}
              css={{ width: 100 }}
              color={'error'}
              auto
            >
              {!loadingReject && 'Reject'}
              {loadingReject && <Loading size="xs" />}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RequestChangeOwnerContact;
