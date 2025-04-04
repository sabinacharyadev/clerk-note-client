import { compareDesc, parseISO } from "date-fns";

const sortNoteByDateDesc = (notes) => {
  return notes.sort((a, b) =>
    compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt))
  );
};
export default sortNoteByDateDesc;
