const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Insert preallocated globals
const globals = `
// PREALLOCATED GLOBALS FOR GC PERFORMANCE
const _groundNormal = new THREE.Vector3();
const _gravity = new THREE.Vector3(0, -120, 0);
const _adaptiveGravity = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);
const _xAxis = new THREE.Vector3(1, 0, 0);
const _zAxis = new THREE.Vector3(0, 0, 1);
const _slopeForward = new THREE.Vector3();
const _targetVel = new THREE.Vector3();
const _targetRotationMat = new THREE.Matrix4();
const _targetQuat = new THREE.Quaternion();
const _tqx = new THREE.Quaternion();
const _tqy = new THREE.Quaternion();
const _tqz = new THREE.Quaternion();
const _playerV = new THREE.Vector3();
const _droneOffsetVec = new THREE.Vector3();
const _idealDronePos = new THREE.Vector3();
const _idealOffset = new THREE.Vector3();
const _lookOffset = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _zeroVec = new THREE.Vector3(0, 0, 0);

export function Player({ boost, cameraCycle, isHigh }) {
`;

code = code.replace(/export function Player\(\{ boost, cameraCycle, isHigh \}\) \{/, globals);

// Now carefully replace the internal creations
code = code.replace(/const groundNormal = new THREE\.Vector3\(groundNormalObj\.x, groundNormalObj\.y, groundNormalObj\.z\);/g, "const groundNormal = _groundNormal.set(groundNormalObj.x, groundNormalObj.y, groundNormalObj.z);");
code = code.replace(/const gravity = new THREE\.Vector3\(0, -120, 0\);/g, "const gravity = _gravity;");
code = code.replace(/const adaptiveGravity = new THREE\.Vector3\(0, -120 - \(height \* 8\), 0\);/g, "const adaptiveGravity = _adaptiveGravity.set(0, -120 - (height * 8), 0);");

code = code.replace(/const forward = new THREE\.Vector3\(0, 0, -1\)\.applyAxisAngle\(new THREE\.Vector3\(0, 1, 0\), boardRotation\.current\);/g, "const forward = _forward.set(0, 0, -1).applyAxisAngle(_yAxis, boardRotation.current);");
code = code.replace(/const targetVel = new THREE\.Vector3\(alignedVel\.x, vel\.current\.y, alignedVel\.z\);/g, "const targetVel = _targetVel.set(alignedVel.x, vel.current.y, alignedVel.z);");

code = code.replace(/const forward = new THREE\.Vector3\(0,0,-1\)\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), boardRotation\.current\);/g, "const forward = _forward.set(0, 0, -1).applyAxisAngle(_yAxis, boardRotation.current);");
code = code.replace(/const targetRotation = new THREE\.Matrix4\(\)\.lookAt\(/g, "const targetRotation = _targetRotationMat.lookAt(");
code = code.replace(/new THREE\.Vector3\(0,0,0\),/g, "_zeroVec,");
code = code.replace(/inAir \? new THREE\.Vector3\(0,1,0\) : groundNormal/g, "inAir ? _yAxis : groundNormal");

code = code.replace(/const targetQuat = new THREE\.Quaternion\(\)\.setFromRotationMatrix\(targetRotation\);/g, "const targetQuat = _targetQuat.setFromRotationMatrix(targetRotation);");
code = code.replace(/const tqx = new THREE\.Quaternion\(\)\.setFromAxisAngle\(new THREE\.Vector3\(1,0,0\), trickRotation\.current\.x\);/g, "const tqx = _tqx.setFromAxisAngle(_xAxis, trickRotation.current.x);");
code = code.replace(/const tqy = new THREE\.Quaternion\(\)\.setFromAxisAngle\(new THREE\.Vector3\(0,1,0\), trickRotation\.current\.y\);/g, "const tqy = _tqy.setFromAxisAngle(_yAxis, trickRotation.current.y);");
code = code.replace(/const tqz = new THREE\.Quaternion\(\)\.setFromAxisAngle\(new THREE\.Vector3\(0,0,1\), trickRotation\.current\.z\);/g, "const tqz = _tqz.setFromAxisAngle(_zAxis, trickRotation.current.z);");

code = code.replace(/const playerV = new THREE\.Vector3\(pos\.current\.x, smoothedYRef\.current, pos\.current\.z\);/g, "const playerV = _playerV.set(pos.current.x, smoothedYRef.current, pos.current.z);");
code = code.replace(/const droneOffsetVec = new THREE\.Vector3\(3, 8, 12\)\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), boardRotation\.current\);/g, "const droneOffsetVec = _droneOffsetVec.set(3, 8, 12).applyAxisAngle(_yAxis, boardRotation.current);");
code = code.replace(/const idealDronePos = playerV\.clone\(\)\.add\(droneOffsetVec\);/g, "const idealDronePos = _idealDronePos.copy(playerV).add(droneOffsetVec);");

code = code.replace(/let idealOffset = new THREE\.Vector3\(0, camHeight \+ 2, camDistance - 1\);/g, "let idealOffset = _idealOffset.set(0, camHeight + 2, camDistance - 1);");
code = code.replace(/let lookOffset = new THREE\.Vector3\(0, 0, -10\);/g, "let lookOffset = _lookOffset.set(0, 0, -10);");
code = code.replace(/lookOffset\.applyAxisAngle\(new THREE\.Vector3\(0, 1, 0\), moveAngle\);/g, "lookOffset.applyAxisAngle(_yAxis, moveAngle);");

code = code.replace(/idealOffset = new THREE\.Vector3\(0, camHeight - \(pullBack \* 0\.2\), camDistance \+ pullBack\);/g, "idealOffset = _idealOffset.set(0, camHeight - (pullBack * 0.2), camDistance + pullBack);");
code = code.replace(/idealOffset\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), moveAngle\);/g, "idealOffset.applyAxisAngle(_yAxis, moveAngle);");
code = code.replace(/const lookAt = playerV\.clone\(\)\.add\(lookOffset\);/g, "const lookAt = _lookAt.copy(playerV).add(lookOffset);");

fs.writeFileSync('components/Player.js', code);
