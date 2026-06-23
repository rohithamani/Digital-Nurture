public class WordDocument implements Document
    {

    @Override
    public void open(){
System.out.println("Opening the word document");
    }
     @Override
    public void close(){
System.out.println("Closing the word document");
    }
     @Override
    public void create(){
System.out.println("Creating the word document");
    }
}
