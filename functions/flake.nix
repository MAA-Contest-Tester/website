{
  description = "Flake for MAATester's firebase functions";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    with flake-utils.lib;
    eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {

        devShell = pkgs.mkShell { buildInputs = with pkgs; [ nodejs-16_x nodePackages.firebase-tools ]; };

        formatter = nixpkgs.legacyPackages."${system}".nixfmt;

      });
}
