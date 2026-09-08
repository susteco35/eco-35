import { useEffect, useMemo, useState } from 'react';
import { Search, Facebook, ArrowRight } from 'lucide-react';

const API_URL =
  'https://script.google.com/macros/s/AKfycbzAVgvVAlVFVHyrMdvZlgfpeqsGE3ldqvLK_Ry3zTu32ZN1PaXpN1e5tzE0HXUxvoM4EQ/exec';

type Member = {
  id: string;
  name: string;
  photoId: string;
  photo: string;
  facebook: string;
  linkedin: string;
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [photoUrls, setPhotoUrls] =
    useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ==========================================
  // EXTRACT GOOGLE DRIVE FILE ID
  // ==========================================

  const extractDriveFileId = (value: string) => {
    if (!value) return '';

    const url = String(value).trim();

    // Already a file ID
    if (
      !url.includes('/') &&
      !url.includes('?') &&
      !url.includes('=')
    ) {
      return url;
    }

    let match = url.match(
      /drive\.google\.com\/thumbnail\?id=([^&]+)/i
    );

    if (match) return match[1];

    match = url.match(
      /drive\.google\.com\/file\/d\/([^/]+)/i
    );

    if (match) return match[1];

    match = url.match(
      /drive\.google\.com\/open\?id=([^&]+)/i
    );

    if (match) return match[1];

    match = url.match(/[?&]id=([^&]+)/i);

    if (match) return match[1];

    match = url.match(/\/d\/([^/?]+)/i);

    if (match) return match[1];

    return '';
  };

  // ==========================================
  // LOAD MEMBERS + PHOTOS
  // ==========================================

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError('');

        // --------------------------------------
        // LOAD GOOGLE SHEET DATA
        // --------------------------------------

        const response = await fetch(
          `${API_URL}?t=${Date.now()}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          'Google Sheets API data:',
          data
        );

        if (!Array.isArray(data)) {
          throw new Error(
            'API did not return an array'
          );
        }

        // --------------------------------------
        // FORMAT MEMBERS
        // --------------------------------------

        const formattedMembers: Member[] = data
          .map((item: any, index: number) => {

            // Apps Script may return photoId,
            // rawPhoto or photo depending on version
            const rawPhoto =
              String(
                item.photoId ||
                  item.rawPhoto ||
                  ''
              ).trim();

            const photoId =
              extractDriveFileId(rawPhoto);

            return {
              id: String(
                item.id ||
                  `member-${index + 1}`
              ).trim(),

              name: String(
                item.name ||
                  item['Full Name'] ||
                  ''
              ).trim(),

              photoId,

              photo: String(
                item.photo || ''
              ).trim(),

              facebook: String(
                item.facebook ||
                  item['Facebook Profile Link'] ||
                  item['Facebook'] ||
                  ''
              ).trim(),

              linkedin: String(
                item.linkedin ||
                  item['LinkedIn Profile Link'] ||
                  item['LinkedIn'] ||
                  ''
              ).trim(),
            };
          })
          .filter(
            (member) => member.name
          );

        console.log(
          'Formatted members:',
          formattedMembers
        );

        setMembers(formattedMembers);

        // --------------------------------------
        // LOAD PHOTOS
        // --------------------------------------

        const photoMap: Record<
          string,
          string
        > = {};

        await Promise.all(
          formattedMembers.map(
            async (member) => {

              if (!member.photoId) {
                console.log(
                  `No photo ID: ${member.name}`
                );
                return;
              }

              try {
                const imageResponse =
                  await fetch(
                    `${API_URL}?image=${encodeURIComponent(
                      member.photoId
                    )}&t=${Date.now()}`,
                    {
                      cache: 'no-store',
                    }
                  );

                if (
                  !imageResponse.ok
                ) {
                  throw new Error(
                    `Image request failed: ${imageResponse.status}`
                  );
                }

                const imageData =
                  await imageResponse.json();

                console.log(
                  `Photo response: ${member.name}`,
                  imageData
                );

                if (
                  imageData.data &&
                  imageData.mimeType
                ) {
                  photoMap[member.id] =
                    `data:${imageData.mimeType};base64,${imageData.data}`;
                }
              } catch (photoError) {
                console.error(
                  `Failed to load photo for ${member.name}:`,
                  photoError
                );
              }
            }
          )
        );

        console.log(
          'Loaded photo URLs:',
          photoMap
        );

        setPhotoUrls(photoMap);

      } catch (err) {
        console.error(
          'Failed to load members:',
          err
        );

        setError(
          'Unable to load members right now. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filtered = useMemo(() => {
    const q = query
      .trim()
      .toLowerCase();

    if (!q) {
      return members;
    }

    return members.filter((member) =>
      member.name
        .toLowerCase()
        .includes(q)
    );
  }, [query, members]);

  // ==========================================
  // FACEBOOK URL
  // ==========================================

  const getFacebookUrl = (
    url: string
  ) => {
    if (!url) return '';

    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `https://${url}`;
  };

  // ==========================================
  // LINKEDIN URL
  // ==========================================

  const getLinkedinUrl = (
    url: string
  ) => {
    if (!url) return '';

    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `https://${url}`;
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section
      id="members"
      className="section-pad relative"
    >
      <div className="container-px mx-auto">

        {/* HEADER */}

        <div className="reveal mx-auto max-w-2xl text-center">

          <span className="eyebrow">
            Our People
          </span>

          <h2 className="mt-4 heading-display text-4xl text-navy-900 sm:text-5xl dark:text-white">
            Meet Our Batch
          </h2>

          <div className="divider-gold" />

          <p className="mt-5 text-pretty text-base leading-relaxed text-slatey-500 dark:text-slatey-400">
            The people who make our journey memorable.
          </p>

        </div>

        {/* SEARCH */}

        <div className="reveal mx-auto mt-10 max-w-md">

          <div className="relative">

            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slatey-400"
            />

            <input
              type="search"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search your friend..."
              aria-label="Search members"
              className="w-full rounded-full border border-slatey-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 shadow-sm outline-none transition-all placeholder:text-slatey-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-navy-700 dark:bg-navy-800/60 dark:text-white dark:placeholder:text-slatey-500"
            />

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="mt-12 text-center">
            <p className="text-sm text-slatey-400">
              Loading members...
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="mt-12 text-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* MEMBERS */}

        {!loading && !error && (
          <>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">

              {filtered.map(
                (member) => (

                  <article
                    key={member.id}
                    className="group card-surface flex flex-col items-center p-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
                  >

                    {/* PHOTO */}

                    <div className="relative">

                      <div className="overflow-hidden rounded-full ring-2 ring-gold-500/40 transition-all duration-500 group-hover:ring-gold-500">

                        {photoUrls[
                          member.id
                        ] ? (

                          <img
                            src={
                              photoUrls[
                                member.id
                              ]
                            }
                            alt={
                              member.name
                            }
                            loading="lazy"
                            className="h-20 w-20 object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 sm:h-24 sm:w-24"
                            onError={(
                              e
                            ) => {
                              console.error(
                                'Image failed:',
                                member.name
                              );

                              e.currentTarget.style.display =
                                'none';
                            }}
                          />

                        ) : (

                          <div className="flex h-20 w-20 items-center justify-center bg-slatey-100 text-xs text-slatey-400 sm:h-24 sm:w-24">
                            {member.photoId
                              ? 'Loading...'
                              : 'No Photo'}
                          </div>

                        )}

                      </div>

                    </div>

                    {/* NAME */}

                    <h3 className="mt-4 font-display text-base font-medium text-navy-900 dark:text-white sm:text-lg">
                      {member.name}
                    </h3>

                    {/* FACEBOOK */}

                    {member.facebook &&
                      member.facebook !==
                        'https://www.facebook.com/' && (

                        <a
                          href={getFacebookUrl(
                            member.facebook
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Facebook`}
                          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slatey-200 px-3.5 py-1.5 text-xs font-semibold text-slatey-600 transition-all hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white dark:border-navy-700 dark:text-slatey-300 dark:hover:border-[#1877f2] dark:hover:bg-[#1877f2] dark:hover:text-white"
                        >
                          <Facebook className="h-3 w-3" />
                          Facebook
                        </a>

                      )}

                    {/* LINKEDIN */}

                    {member.linkedin && (

                      <a
                        href={getLinkedinUrl(
                          member.linkedin
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slatey-200 px-3.5 py-1.5 text-xs font-semibold text-slatey-600 transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-navy-700 dark:text-slatey-300 dark:hover:border-[#0A66C2] dark:hover:bg-[#0A66C2] dark:hover:text-white"
                      >
                        <span className="font-bold">
                          in
                        </span>
                        LinkedIn
                      </a>

                    )}

                  </article>

                )
              )}

            </div>

            {/* NO RESULTS */}

            {filtered.length === 0 && (
              <p className="mt-12 text-center text-sm text-slatey-400 dark:text-slatey-500">
                No members found for
                &ldquo;{query}&rdquo;.
              </p>
            )}
          </>
        )}

        {/* VIEW ALL */}

        <div className="reveal mt-12 text-center">

          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-700 transition-colors hover:text-gold-600 dark:text-slatey-300 dark:hover:text-gold-400"
          >
            View All Members

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

        </div>

      </div>
    </section>
  );
}