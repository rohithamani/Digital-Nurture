public class ExcelDocument implements Document {
     @Override
    public void open(){
        System.out.println("Opening the Exceldocument");
    } 
    @Override
    public void close(){
        System.out.println("Closing the Exceldocument");
    } 
    @Override
    public void create(){
        System.out.println("Creating the Exceldocument");
    }
}
