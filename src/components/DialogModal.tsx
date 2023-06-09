import { MouseEvent, useEffect, useRef } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type DialogModalProps = {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  tableCellContent: string;
};

const DialogModal = ({
  title,
  isOpened,
  onClose,
  children,
  tableCellContent
}: DialogModalProps) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const openSearchURL = (address: string, direction: string): void => {

    // TODO: Turn into a switch statement
    // The following two blocks detect whether or not a search param exists in the web address, 
    // then navigates to the appropriate web address
    if (searchParams.size !== 0 && direction === "TO") {
      searchParams.append("result.All_Traffic2edest", address)
      navigate({
        pathname: "/search",
        search: searchParams.toString()
      })
    } else if (searchParams.size !== 0  && direction === "FROM") {
      searchParams.append("result.All_Traffic2esrc", address)
      navigate({
        pathname: "/search",
        search: searchParams.toString()
      })
      // the following two blocks navigates to web addresses if there are no
      // search params in the web address
    } else if (direction === "TO") {
      navigate({
        pathname: "/search",
        search: createSearchParams({
          All_Traffic2edest: address
        }).toString()
      })
    } else if (direction === "FROM") {
          navigate({
        pathname: "/search",
        search: createSearchParams({
          All_Traffic2esrc: address
        }).toString()
      })
    }
    onClose();
  }

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="dialog"
    >
      <h3>{title}</h3>

      {children}

      <div>
        <button className="button" value={tableCellContent} onClick={(e) => openSearchURL((e.target as HTMLButtonElement).value, "TO")}>To</button>
        <button className="button" value={tableCellContent} onClick={(e) => openSearchURL((e.target as HTMLButtonElement).value, "FROM")}>From</button>
      </div>
    </dialog>
  );
};

export { DialogModal }
export default DialogModal;