import { Button, Card, Grid, Input, Modal, Row, Text } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { cloneElement, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { MULTI_SIGNATURE, OWNER } from "../../constants/constants";
import { useEventState } from "../../hooks/useGlobalState";
import createSecrets from "../../utils/createSecrets"

type Mode = 'detail' | 'create' | 'edit';

type ListItem = {
  title: string;
  img: string;
  date: string;
};

class SecretForEvent {
  public venue: string = "default";
  public secrets: string[] = [];

  public constructor(
    fields?: {
        venue?: string,
        secrets?: string[],

    }) {
    if (fields) {
      this.venue = fields.venue || this.venue;       
      this.secrets = fields.secrets || this.secrets;
    }
    }
}


export default function Events() {
  const [visible, setVisible] = useState(false)
  const [venue, setVenue] = useState(false)
  const [mode, setMode] = useState<Mode>('detail')
  const [item, setItem] = useState<ListItem>({} as ListItem)
  // const [venueSecrets, setVenueSecrets] = useState({})
  // const [venueSecrets, setVenueSecrets] = useState<Map<string, SecretForEvent>>({} as Map<string, SecretForEvent>)
  const [venueSecrets, setVenueSecrets] = useState({})
  // const [venueSecrets, setVenueSecrets] = useState<Array<string>>([]);

  const [secrets, setSecrets] = useEventState('secrets');

  const router = useRouter()

  const { address } = useAccount()

  useEffect(() => {
    console.log(secrets);
    console.log(venueSecrets)
    console.log(router);
    console.log(`http://localhost:3000/events/${secrets?.[0].substring(0, 10)}`)
  }, [router])

  // on first mount (emulate API call)
  // useEffect(() => {
  //   setVenueSecrets({...venueSecrets, })
  //   // venueSecrets.set("title", new SecretForEvent({venue: "Zurich", secrets: createSecrets()}))
  //   // setVenueSecrets()
  // },)
  
  // load in specific secrets to an Event
  useEffect(() => {
    console.log("here")
    setVenueSecrets({...venueSecrets, ...{venue: item.title, secrets: createSecrets()}});
    // setSecrets(venueSecrets.get(item.title)?.secrets)
    // Map<string, SecretForEvent> _venueSecrets = venueSecrets as Map<string, SecretForEvent>;
    console.log(venueSecrets.item.title?.secrets);
  }, [item])

  const list = [
    {
      title: "ETH Zurich",
      img: "https://gateway.pinata.cloud/ipfs/QmVV6WM8WMS5KAVLRVvVSfRWV9cYVphPGqVhd4zgTVg2NR",
      date: "01. December - 03. December",
    },
    {
      title: "ETH Bern",
      img: "https://gateway.pinata.cloud/ipfs/QmNrVkqwF4ewSS1JBJ77Rh9tkWmECPaLCiwuca6cnaggQd",
      date: "07. December - 10. December",
    },
  ];

  const onClick = (index: number) => {
    setMode('detail');
    setVisible(true);
    setItem(list[index])
  }

  const createEvent = () => {
    setMode('create');
    setVisible(true);
  }

  const editEvent = () => {
    setMode('edit');
    setVisible(true);
    console.log('createEvent');
  }

  const onClose = () => setVisible(false);

  const downloadTxtFile = (content: string[]) => {
    const element = document.createElement("a");
    const file = new Blob(content, {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };



  const submit = () => {
    if (mode === 'edit') {
    }

    if (mode === 'create') {
      const createdSecret = createSecrets();
      // add to map
      // implement
      console.log(createdSecret);
      downloadTxtFile(createdSecret);
      // add to current scope
      setSecrets(createdSecret);
      console.log(secrets);

    }
  }

  const renderButtons = () => {
    return (
      <>
        {(address === OWNER || address === MULTI_SIGNATURE) && (
          <Button
            auto
            ghost
            onClick={editEvent}>
            Edit
          </Button>
        )}

        {address === MULTI_SIGNATURE && (
          <Button
            auto
            ghost
            onClick={() => setVenue(true)}>
            Preview
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <Grid.Container direction="row">
        <Grid>
          <Text
            h2
            css={{
              textGradient: "90deg, #E31D1C -20%, #FF0080",
            }}
            weight="bold"
          >
            Events
          </Text>
          <Button shadow color="primary" auto onClick={createEvent}>
            Create Event
          </Button>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} justify="flex-start">
        {list.map((item, index) => (
          <Grid xs={6} sm={3} key={index}>
            <Card isPressable onClick={() => onClick(index)}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={item.img}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  alt={item.title}
                />
              </Card.Body>
              <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{item.title}</Text>
                  <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    {item.date}
                  </Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      {/* Detail- / Create- / Edit Modal */}
      <Modal
        closeButton
        fullScreen
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {mode === 'create' ? 'Create new Event' : (mode === 'edit' ? 'Edit Event' : 'Event Details')}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Card.Image
            src={item?.img || ''}
            objectFit="cover"
            width="100%"
            height={140}
            alt={item?.title || ''}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Title"
          />

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={onClose}>
            Close
          </Button>
          {mode !== 'detail' && (
            <Button auto onClick={submit}>
              {mode === 'create' ? 'Create' : 'Edit'}
            </Button>
          )}
          {mode !== 'create' && renderButtons()}
        </Modal.Footer>
      </Modal>


      <Modal
        closeButton
        fullScreen
        aria-labelledby="modal-title"
        open={venue}
        onClose={() => setVenue(false)}
      >
        <Modal.Body>

          <Grid.Container direction="column">
            <Grid>
              <div style={{ background: 'white', padding: '16px', height: "128px", width: "128px" }}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={""}
                  viewBox={`0 0 256 256`}
                />
              </div>

              <Text
                h1
                size={60}
                weight="bold"
              >
                Gain your Experience!
              </Text>
            </Grid>

            <Grid>
              <div style={{ background: 'white', padding: '16px', height: "128px", width: "128px" }}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`http://localhost:3000/events/${secrets?.[0].substring(0, 10)}`}
                  viewBox={`0 0 256 256`}
                />
              </div>

              <Text
                h1
                size={60}
                weight="bold"
              >
                Mint our Membership NFT!
              </Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
      </Modal>
    </>
  );
}