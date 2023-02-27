import { useActor, useMachine, normalizeProps } from "@zag-js/solid";
import * as toast from "@zag-js/toast";
import {
  createMemo,
  createUniqueId,
  createSignal,
  createContext,
  useContext,
  For,
  JSX,
} from "solid-js";

interface ToastProps {
  key: number;
  actor: toast.Service;
}

function Toast(props: ToastProps) {
  const [state, send] = useActor(props.actor);
  const api = createMemo(() => toast.connect(state, send, normalizeProps));

  return (
    <div class="alert alert-info shadow-lg">
      <div {...api().rootProps}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 {...api().titleProps} class="font-bold">
            {api().title}
          </h3>
          <span>{api().description}</span>
        </div>
      </div>
      <div class="flex-none">
        <button class="btn btn-sm btn-ghost" onClick={api().dismiss}>
          Close
        </button>
      </div>
    </div>
  );
}

const ToastContext = createContext();
const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: JSX.Element;
}

export function ToastProvider(props: ToastProviderProps) {
  const [state, send] = useMachine(
    toast.group.machine({ id: createUniqueId() })
  );

  const api = createMemo(() =>
    toast.group.connect(state, send, normalizeProps)
  );

  return (
    <ToastContext.Provider value={api}>
      <For each={Object.entries(api().toastsByPlacement)}>
        {([placement, toasts]) => (
          <div key={placement} {...api().getGroupProps({ placement })}>
            <For each={toasts}>
              {(toast) => <Toast key={toast.id} actor={toast} />}
            </For>
          </div>
        )}
      </For>

      {props.children}
    </ToastContext.Provider>
  );
}
