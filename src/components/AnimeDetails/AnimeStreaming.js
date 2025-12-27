import ExternalLinkButton from "../Buttons/ExternalLinkButton";

const AnimeStreaming = ({ externalLinks }) => {
  return (
    <div className="py-8 border-b border-gray-400">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        External Links
      </h3>
      <div className="flex gap-5">
        {externalLinks.length ? (
          externalLinks.length &&
          externalLinks.map((link) => (
            <ExternalLinkButton
              key={link.id}
              url={link.url}
              color={link.color}
              icon={link.icon}
              site={link.site}
            />
          ))
        ) : (
          <div className="py-4 text-gray-500 dark:text-gray-400 text-sm">
            No External Links Available
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeStreaming;
