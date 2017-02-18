//
//  AudioPlayer.swift
//  Lune
//
//  Created by Andrew Kwon on 4/3/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

/**
 *  AudioPlayer - Stream audio from a playlist of URIs
 */

@objc(AudioPlayer)

class AudioPlayer: NSObject {
  
  var playingItem = (name: String, index: Int)("", -1)
  var playlists = [String: (player: AVQueuePlayer, playlist: Array<AVPlayerItem>)]()
  var loadedTime: Double = 0.0
  
  // loadPlaylist loads an AVQueuePlayer with a given set of audio URIs for a specific playlist name
  @objc(loadPlaylist:audioURIs:)
  func loadPlaylist(for name: String, with audioURIs: Array<String>) -> Void {

    // Dispatch an asynchronous task to load the player with playlist
    DispatchQueue.global(qos: .userInitiated).async {
      print("Loading playlist...\(name)")
      
      // Construct new playlist
      var playlist: Array<AVPlayerItem> = []
      for uri in audioURIs {
        playlist.append(AVPlayerItem(asset: AVURLAsset(url: URL(string: uri)!)))
      }
      
      // Reset currently existing player and playlist
      self.playlists[name]?.player.removeAllItems()
      self.playlists[name]?.playlist.removeAll()
      print("Removed all from queue player and playlist...")
      print("about to initialize avqueueplayer")

      self.playlists[name] = (player: AVQueuePlayer(items: playlist), playlist: playlist)
      
      DispatchQueue.main.async(execute: {
        print("Completed loading queue player")
      })
    }
  }
  
  @objc(play:index:)
  func play(for name: String, with index: Int) -> Void {
    
    print("Attempting to play index \(index) in the \(name) playlist")
    
    if let player = playlists[name]?.player, let playlist = playlists[name]?.playlist {
      
      if player.items().count != 0 {
        player.removeAllItems()
      }
      
      for i in (index..<playlist.count) {
        if (player.canInsert(playlist[i], after: nil)) {
          
          print("- - -")
          var context = (name: String, index: Int)(name, i)
          let ptr = UnsafeMutableRawPointer(&context)
          let playerContext = ptr.load(as: (name: String, index: Int).self)
          print(playerContext.name)
          print(playerContext.index)
          
          playlist[i].seek(to: kCMTimeZero)
          playlist[i].addObserver(self, forKeyPath:"status", options:.new, context:&context)
          playlist[i].addObserver(self, forKeyPath:"loadedTimeRanges", options:.new, context:&context)
          NotificationCenter.default.addObserver(self, selector: #selector(self.playerDidFinishPlaying(note:)),
                                                 name: NSNotification.Name.AVPlayerItemDidPlayToEndTime, object: playlist[i])
          NotificationCenter.default.addObserver(
            forName: NSNotification.Name.AVPlayerItemFailedToPlayToEndTime,
            object: nil,
            queue: nil,
            using: { notification in
              print("Error during playing")
          })
          
          player.insert(playlist[i], after: nil)
        }
      }
      
      // Pause any playing playlist
      if let currentPlayer = playlists[playingItem.name]?.player {
        currentPlayer.pause()
      }
      
      playingItem.name = name
      playingItem.index = index

      player.play()
      
      print("Started playing index \(playingItem.index) at \(playingItem.name)")
      
    } else {
      print("Error: unable to find player and playlist for \(name)")
    }
    
  }
  
  func playerDidFinishPlaying(note: NSNotification) {
    print("Audio finished playing index \(playingItem.index) at \(playingItem.name)")
  }
  
  override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
    print("-> Observing value for \(keyPath)")

//    let playerContext = context?.load(as: (name: String, index: Int).self)
//    print("Context name: \(playerContext?.name)")
//    print("Context index: \(playerContext?.index)")
    
    let status: AVPlayerItemStatus
    
    // Get the status change from the change dictionary
    if let statusNumber = change?[.newKey] as? NSNumber {
      status = AVPlayerItemStatus(rawValue: statusNumber.intValue)!
    } else {
      status = .unknown
    }
    
    // Switch over the status
    switch status {
      case .readyToPlay:
        print("Ready to play...\(keyPath)")
        break;

      case .failed:
        print("Failed to play...\(keyPath)")
        break;

      case .unknown:
        print("Unknown status...\(keyPath)")
        break;
    }
    
  }
  
}
