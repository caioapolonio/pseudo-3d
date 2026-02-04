import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black/50 backdrop-blur-sm p-4 flex flex-col items-center gap-4 text-zinc-400 sm:flex-row sm:justify-center">
      <p className="text-sm">Made with ❤️ by Caio</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/caioapolonio"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative transform transition-all duration-300 hover:scale-125 hover:rotate-6 hover:text-green-500"
        >
          <FaGithub size={24} />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
            GitHub
          </span>
        </a>
        <a
          href="https://linkedin.com/in/caioviniciusmendes"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative transform transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:text-green-500"
        >
          <FaLinkedin size={24} />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
            LinkedIn
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
