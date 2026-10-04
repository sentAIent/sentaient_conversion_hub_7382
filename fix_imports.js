const fs = require('fs');
let code = fs.readFileSync('snowboarders-paradise/components/Player.js', 'utf8');
code = code.replace(/import React, { useRef, useEffect, useState } from 'react';\nimport React, { useRef, useState, useEffect } from 'react';/, "import React, { useRef, useState, useEffect } from 'react';");
code = code.replace(/import { useCustomization } from '.\/CustomizationContext';/, "import { useCustomization } from './CustomizationContext';\nimport { CarveTrail } from './CarveTrail';");
fs.writeFileSync('snowboarders-paradise/components/Player.js', code);
