type WordmarkProps = {
  className?: string;
};

export default function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span className={`display ${className}`}>[[ BUKKET ]]</span>
  );
}
