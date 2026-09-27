import CharacterForm from '../CharacterForm';
import { createBrandAvatar } from '../actions';

export default function NewCharacterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Character</h1>
      <CharacterForm action={createBrandAvatar} />
    </div>
  );
}
