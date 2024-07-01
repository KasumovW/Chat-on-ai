# Use the miniconda3 image to have conda available
FROM continuumio/miniconda3

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    llvm \
    libncurses5-dev \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libffi-dev \
    liblzma-dev \
    python3-openssl \
    git

# Create the private environment with Python 3.12
RUN conda create -n private python=3.12 -y

# Activate the environment and set it as the default shell
SHELL ["conda", "run", "-n", "private", "/bin/bash", "-c"]

# Copy the requirements file
COPY requirements.txt .

# Install the required Python packages in the conda environment
RUN conda run -n private pip install --no-cache-dir -r requirements.txt

# Clone and install llama-cpp-python manually
RUN git clone https://github.com/ggerganov/llama.cpp.git && \
    cd llama.cpp && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make && \
    cd ../.. && \
    conda run -n private pip install ./llama.cpp

# Clone and install chroma-hnswlib manually
RUN git clone https://github.com/crestonbunch/chroma-hnswlib.git && \
    cd chroma-hnswlib && \
    conda run -n private pip install .

# Copy the rest of the application code
COPY . .

# Expose port 5000 for Flask
EXPOSE 5000

# Command to run the ingestion script and then the Flask API
CMD ["conda", "run", "--no-capture-output", "-n", "private", "sh", "-c", "python ingest.py && MODEL=miqu-1-70b.q5_K_M python privateGPTAPI.py"]
