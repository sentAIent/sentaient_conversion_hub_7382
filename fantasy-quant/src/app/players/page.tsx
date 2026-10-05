import { redirect } from 'next/navigation';

export default function PlayersIndex() {
  // Redirect to a default player deep dive
  redirect('/players/DAL');
}
