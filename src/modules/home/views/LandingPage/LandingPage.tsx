import { LayoutSection } from '@core/components';
import { Button } from '@mantine/core';
import { homePaths } from '@modules/home/route';
import { useNavigate } from 'react-router-dom';
import { HomePageCarousel } from '../HomePage/components';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="grow pt-[64px] bg-white">
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-8 pb-0">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#37b6cc] to-[#52da36]">
                  LUUX - What will you design today?
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-md md:text-xl text-gray-600">
                  LUUX makes it easy to create professional designs and to share or print them.
                </p>
              </div>
              <Button className="mt-6" variant="gradient" onClick={() => navigate(homePaths.home)}>
                Start Designing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-12">
            <div className="max-w-3xl mx-auto text-center pb-8">
              <h2 id="explore" className="text-2xl md:text-4xl font-medium">
                Explore our features
              </h2>
            </div>
            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none items-center justify-center">
              <a
                href="/react-ui/"
                className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-110 transition-all"
              >
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-[#17cf97]" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-blue-300"
                        d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M20.571 37.714h5.715L36.57 26.286h8"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        strokeLinecap="square"
                        d="M41.143 34.286l3.428 3.428-3.428 3.429"
                      />
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M41.143 29.714l3.428-3.428-3.428-3.429"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Redesign the way you work
                </h4>
                <p className="text-gray-600 text-center">
                  Will transform your organization's workflows, discover all the launches from Luux
                  Create that will boost your team's productivity and visual communication.
                </p>
              </a>

              <a
                href="/react-file/"
                className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-110 transition-all"
              >
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-[#17cf97]" width="64" height="64" rx="32" />
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        cx="12.571"
                        cy="12.571"
                        r="1.143"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Design with others
                </h4>
                <p className="text-gray-600 text-center">
                  Invite friends and family to design with you, or set your whole team up to work
                  together. Our collaboration features let you comment and work in real-time on
                  Presentations⁠
                </p>
              </a>

              <a
                href="/react-editor/"
                className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-110 transition-all"
              >
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-[#17cf97]" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-blue-300"
                        d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"
                      />
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"
                      />
                      <path className="stroke-current text-blue-300" d="M36.571 32H40" />
                      <path
                        className="stroke-current text-white"
                        d="M24 32h3.429"
                        strokeLinecap="square"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Design and print in one place
                </h4>
                <p className="text-gray-600 text-center">
                  Turn your memories into photo albums, your designs into T-shirts, and your
                  branding into business cards⁠. Get all your printing done right here with fast and
                  flexible delivery to your doorstep.
                </p>
              </a>

              <a
                href="/react-hooks/"
                className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-110 transition-all"
              >
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-[#17cf97]" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-white"
                        d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                        strokeLinecap="square"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Templates for absolutely anything
                </h4>
                <p className="text-gray-600 text-center">
                  Customize an office template, or design something more personal, like an
                  invitation.{' '}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <LayoutSection>
          <HomePageCarousel />
        </LayoutSection>
      </section>

      <footer className="py-4 border-1 border-top border-solid border-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-md text-[#17cf97] text-center mr-4">
            &copy; 2024 <a href="https://datahouse.com">LUUX</a>. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
};
export default LandingPage;
