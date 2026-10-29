const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newStyles = `
  topHeaderBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerLogo: {
    width: 140,
    height: 40,
  },
  headerNav: {
    flexDirection: 'row',
    gap: 15,
  },
  topRightInfo: {
    position: 'absolute',
    top: 90,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 90,
    gap: 10,
  },
  weatherBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  weatherText: {
    color: '#00ffff',
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 50,
  },
  glassCardClean: {
    backgroundColor: 'rgba(10, 15, 30, 0.7)',
    borderRadius: 16,
    padding: 20,
    width: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 208, 255, 0.3)',
  },
`;

code = code.replace(/const styles = StyleSheet\.create\(\{/, "const styles = StyleSheet.create({" + newStyles);

fs.writeFileSync('App.js', code);
