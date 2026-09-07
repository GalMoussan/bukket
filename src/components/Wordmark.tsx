type WordmarkProps = {
  className?: string;
};

export default function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span className={`display text-vast ${className}`}>[[ BUKKET ]]</span>
  );
}
