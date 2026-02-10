#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
cd frontend
yarn install --frozen-lockfile

echo "🏗️ Building application..."
NODE_OPTIONS=--max_old_space_size=4096 CI=false GENERATE_SOURCEMAP=false yarn build

echo "✅ Build completed successfully!"
