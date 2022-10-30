import { Container, Grid, Text } from "@nextui-org/react";
import Spline from "@splinetool/react-spline";
import { ListItem } from "./ListItem";

export const Content = () => {
  const list = [
    {
      title: "³ web3 spaces",
      subtitle: "W/ Meetups, Workshops and Hackerhouses in real life",
      image: "https://gateway.pinata.cloud/ipfs/QmbEVZ6EbZhGtk5Z2HrVEmDgfpGfawjBpBYzwWUhvXdzN7",
    },
    {
      title: "³ Community spirit",
      subtitle: "Connect, Learn and Build",
      image: "https://gateway.pinata.cloud/ipfs/QmedNM3Ggi1d8rWKt1JtuqcNkVnZDvjtKG8J6VQPTSYQfW",
    },
    {
      title: "³ Just do Web3",
      subtitle: "Take Ownership. LFG 🚀",
      image: "https://gateway.pinata.cloud/ipfs/QmX1xEgBsCrBHvzWTvfFx9EJjhzeFhAdnNcNUn7h3BQQBV",
    },
  ]


  return (
    <Container fluid>
      <Text
        h1
        size={60}
        weight="bold"
      >
        The First DAO
      </Text>
      <Text
        h1
        size={60}
        weight="bold"
      >
        For
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: "90deg, #E31D1C -20%, #FF0080",
        }}
        weight="bold"
      >
        Switzerland.³
      </Text>

      <Grid.Container gap={2} justify="center">
        {list.map((item, i) => (
          <Grid key={i} xs={12} sm={4}>
            <ListItem title={item.title} subtitle={item.subtitle} image={item.image} />
          </Grid>
        ))}
      </Grid.Container>

      <div style={{ height: '750px' }}>
        <Spline scene="https://prod.spline.design/HU-SeJRjMO08kMhD/scene.splinecode" />
      </div>
    </Container>
  )
};
