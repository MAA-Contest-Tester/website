{
  description = "MAA Tester Flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    with flake-utils.lib;
    eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {

        devShell = pkgs.mkShell { buildInputs = with pkgs; [ nodejs yarn nodePackages.firebase-tools nodePackages.ts-node nodePackages.typescript ]; };

        formatter = nixpkgs.legacyPackages."${system}".nixfmt;

      });
}
