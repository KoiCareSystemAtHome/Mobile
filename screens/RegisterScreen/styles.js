import { StyleSheet } from "react-native";

export 
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  terms: {
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  tab: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#555',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height:50,
    borderRadius:10 ,
    backgroundColor:"white"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  pickerInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
    color:"#C4C4C4"
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  remember: {
    marginLeft: 8,
  },
  forgot: {
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#6497B1',
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});