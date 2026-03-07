#!/usr/bin/env python3
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve WATON_WEB locally.")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=4173, help="Bind port (default: 4173)")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parent

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *handler_args, **handler_kwargs):
            super().__init__(*handler_args, directory=str(root), **handler_kwargs)

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    url_host = "127.0.0.1" if args.host == "0.0.0.0" else args.host
    print(f"[WATON_WEB] Serving {root}")
    print(f"[WATON_WEB] Open http://{url_host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[WATON_WEB] Server stopped.")


if __name__ == "__main__":
    main()
