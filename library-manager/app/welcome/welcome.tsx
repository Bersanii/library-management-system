import { Card, Button } from "react-bootstrap";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" alt="..." />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </main>
  );
}
