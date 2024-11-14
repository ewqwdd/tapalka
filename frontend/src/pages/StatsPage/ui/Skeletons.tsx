export default function Skeletons() {
  return new Array(20)
    .fill(0)
    .map((_, index) => <li className="bg-black/20 backdrop-blur-3xl h-14 px-3 rounded-xl" key={index} />)
}
