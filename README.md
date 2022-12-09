# MAA Tester

An integrated testing environment designed to help you achieve your math contest
goals by automatically organizing your progress on your practice contests.

## Development Setup

You'll need nodejs and yarn on your system. If you're on a nix system, you can just do
`nix develop` and the correct versions will be in your dev environment.

Once you're in an appropriate development environment, run `yarn run setup` to
compile all functions and install all dependencies. It will invoke the
`setup.sh` script.

### Dev Server

In order to start up the vite dev server, run `yarn dev`.

### Functions

In order to also start up the firebase emulators, run `yarn run emulators`.
This will require a NodeJS version of 16.
