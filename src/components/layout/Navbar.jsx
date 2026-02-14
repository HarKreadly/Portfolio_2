import CardNav from "./ui/CardNav";

const Navbar = () => {
  const items = [
    {
      label: "About",
      bgColor: "#1e293b", // Slate 800
      textColor: "#fff",
      links: [
        { label: "My Story", href: "#about", ariaLabel: "Learn about me" },
        { label: "Resume", href: "/cv_en.pdf", ariaLabel: "Download my resume" },
      ],
    },
    {
      label: "Work",
      bgColor: "#115e59", // Teal 800
      textColor: "#fff",
      links: [
        { label: "Projects", href: "#projects", ariaLabel: "View my projects" },
        { label: "Skills", href: "#skills", ariaLabel: "View my skills" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#9f1239", // Rose 800
      textColor: "#fff",
      links: [
        { label: "Get In Touch", href: "#contact", ariaLabel: "Contact me" },
        {
          label: "LinkedIn",
          href: "https://linkedin.com",
          ariaLabel: "Connect on LinkedIn",
        },
      ],
    },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[800px]">
        <CardNav items={items} ease="power3.out" />
      </div>
    </div>
  );
};

export default Navbar;
