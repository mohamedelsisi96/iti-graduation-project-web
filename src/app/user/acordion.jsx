import React from "react";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
function Acordion() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
        className="my-5"
      >
        <h2 id="accordion-flush-heading-1" className="px-3">
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <span>What is E-Learning</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          className="hidden"
          aria-labelledby="accordion-flush-heading-1"
        >
          <div className="py-5 px-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              E-Learning is an online learning platform dedicated to providing
              high-quality, accessible education to learners worldwide. We offer
              a diverse range of courses across various subjects, from
              technology and business to creative arts and personal development.
            </p>
          </div>
        </div>
        <h2 id="accordion-flush-heading-2" className="px-3">
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-2"
            aria-expanded="false"
            aria-controls="accordion-flush-body-2"
          >
            <span>Our Mission</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-2"
          className="hidden"
          aria-labelledby="accordion-flush-heading-2"
        >
          <div className="py-5 px-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our mission is to empower individuals worldwide through
              accessible, high-quality education. We believe in lifelong
              learning and aim to provide the tools and knowledge needed for
              personal and professional growth in the rapidly evolving global
              landscape.
            </p>
          </div>
        </div>
        <h2 id="accordion-flush-heading-3" className="px-3">
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-3"
            aria-expanded="false"
            aria-controls="accordion-flush-body-3"
          >
            <span>Our Instructors</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-3"
          className="hidden"
          aria-labelledby="accordion-flush-heading-3"
        >
          <div className="py-5 px-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our courses are taught by industry experts, experienced
              professionals, and acclaimed academics. We carefully vet all
              instructors to ensure they have deep knowledge in their fields and
              the ability to teach effectively online.
            </p>
          </div>
        </div>
        <h2 id="accordion-flush-heading-4" className="px-3">
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-4"
            aria-expanded="false"
            aria-controls="accordion-flush-body-4"
          >
            <span>E-Learning differ from other online learning platforms</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-4"
          className="hidden"
          aria-labelledby="accordion-flush-heading-4"
        >
          <div className="py-5 px-5 border-b border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              E-learning stands out through:
            </p>
            <ol className="mb-2 text-gray-500 dark:text-gray-400">
              <li className="mb-2 text-gray-500 dark:text-gray-400">
                Quality-focused content: We prioritize high-quality, up-to-date
                courses.
              </li>
              <li className="mb-2 text-gray-500 dark:text-gray-400">
                Interactive learning: Our courses include quizzes, projects, and
                peer interactions.
              </li>
              <li className="mb-2 text-gray-500 dark:text-gray-400">
                Flexible learning: Study at your own pace, anytime, anywhere.
              </li>
              <li className="mb-2 text-gray-500 dark:text-gray-400">
                Community support: Engage with fellow learners and instructors
                in course forums.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default Acordion;
