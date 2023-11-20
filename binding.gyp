{
  'variables': {
    'openssl_fips': '0',
  },
  "targets": [
    {
      "target_name": "native",
      "msvs_settings": {
        "VCCLCompilerTool": { "ExceptionHandling": 1 },
      },
      "sources": [
        "src/native.cc",
      ],
      "libraries": [
        "advapi32",
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
      ]
    }
  ]
}