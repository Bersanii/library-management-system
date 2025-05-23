import { Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <h2>Welcome to Home</h2>
      <p>Please login to access the dashboard.</p>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default Home;