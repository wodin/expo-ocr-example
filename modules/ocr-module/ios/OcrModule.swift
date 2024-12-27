import ExpoModulesCore
import Vision

public class OcrModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('OcrModule')` in JavaScript.
    Name("OcrModule")

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("recognizeTextAsync") { (uriString: String) -> String in
      guard let url = URL(string: uriString), url.isFileURL else {
        throw NSError(domain: "OcrModule", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid file URI"])
      }
      let fileUrl = url

      // Load image data
      guard let imageData = try? Data(contentsOf: fileUrl),
            let uiImage = UIImage(data: imageData),
            let cgImage = uiImage.cgImage else {
        throw NSError(domain: "OcrModule",
                      code: 1,
                      userInfo: [NSLocalizedDescriptionKey: "Failed to load image from: \(uriString)"])
      }

      // Use Swift concurrency to run Vision OCR
      return try await withCheckedThrowingContinuation { continuation in
        let request = VNRecognizeTextRequest { request, error in
          if let error = error {
            continuation.resume(throwing: error)
            return
          }

          guard let observations = request.results as? [VNRecognizedTextObservation], !observations.isEmpty else {
            continuation.resume(returning: "")
            return
          }

          // Gather all recognized text into a single string
          let recognized = observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
          continuation.resume(returning: recognized)
        }

        // Configure request (optional tweaks)
        request.recognitionLevel = .accurate
        request.usesLanguageCorrection = true
        request.recognitionLanguages = ["en-US"]  // Adjust as needed

        // Perform request
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        do {
          try handler.perform([request])
        } catch {
          continuation.resume(throwing: error)
        }
      }
    }
  }
}
