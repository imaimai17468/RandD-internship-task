---
to: components/<%= level %>/<%= name %>/<%= name %>.tsx
unless_exists: true
---
interface Props {
  purpose?: string;
}

export default function <%= name %>(props: Props): JSX.Element {
  return (
    <>
    </>
  );
};